#!/usr/bin/env node
import {
    getAllTests,
    runTests,
    formatTestResultsAsText,
    type TestResult,
} from "@benchristel/taste"
import {glob} from "node:fs/promises"
import {join} from "node:path"

async function main() {
    const testFilePattern =
        join(import.meta.dirname, "..", "..", "packages", "*", "src", "*.test.ts")

    // TODO: import files in parallel
    for await (const path of glob(testFilePattern)) {
        await import(path)
    }

    await runTests(getAllTests())
        .then(reportResultsAndExit)
        .catch(console.error)
}

function reportResultsAndExit(r: {results: TestResult[]}): never {
    console.log(formatTestResultsAsText(r))
    const exitCode = r.results.some(failed) ? 1 : 0
    process.exit(exitCode)
}

function failed(t: TestResult): boolean {
    return t.error != null
}

await main()
