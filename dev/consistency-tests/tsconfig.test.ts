import {test, expect, equals} from "@benchristel/taste";
import {glob, readFile} from "node:fs/promises";
import {join} from "node:path";

const root = join(import.meta.dirname, "..", "..");

for await (const path of glob(join(root, "pkg", "*", "tsconfig.build.json"))) {
    const json = await readFile(path, "utf-8");
    const tsconfig = JSON.parse(json);

    test(`${path}`, {
        "includes files in src/"() {
            expect(tsconfig.include, equals, ["src"]);
        },

        "excludes test files"() {
            expect(tsconfig.exclude, equals, [
                "**/test.ts",
                "**/typetest.ts",
                "**/*.test.*",
                "**/*.typetest.*",
            ]);
        },

        "extends the base tsconfig.json"() {
            expect(tsconfig.extends, equals, "../../tsconfig.json");
        },
    });
}
