#!/usr/bin/env node
import {
    getAllTests,
    runTests,
    formatTestResultsAsText,
    type TestResult,
} from "@benchristel/taste";
import {glob} from "node:fs/promises";
import {join} from "node:path";

async function main() {
    const root = [import.meta.dirname, "..", ".."];
    const testFilePatterns = [
        join(...root, "pkg", "**", "*.test.ts"),
        join(...root, "pkg", "**", "test.ts"),
        join(...root, "dev", "scripts", "**", "*.test.ts"),
        join(...root, "dev", "consistency-tests", "**", "*.test.ts"),
    ];

    await importAll(glob(testFilePatterns));

    await runTests(getAllTests())
        .then(reportResultsAndExit)
        .catch(console.error);
}

async function importAll(paths: AsyncIterable<string>): Promise<void> {
    const imported = [];
    for await (const path of paths) {
        imported.push(import(path));
    }
    await Promise.all(imported);
}

function reportResultsAndExit(r: {results: TestResult[]}): never {
    console.log(formatTestResultsAsText(r));
    const exitCode = r.results.some(failed) ? 1 : 0;
    process.exit(exitCode);
}

function failed(t: TestResult): boolean {
    return t.error != null;
}

await main();
