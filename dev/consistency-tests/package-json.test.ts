import {test, expect, is, equals} from "@benchristel/taste";
import {glob, readFile} from "node:fs/promises";
import {join} from "node:path";

const root = join(import.meta.dirname, "..", "..");

for await (const path of glob(join(root, "pkg", "*", "package.json"))) {
    const json = await readFile(path, "utf-8");
    const packageConfig = JSON.parse(json);
    const dirName = path.match(/\/pkg\/([^/]+)\/package.json$/)?.[1];

    test(`${path}`, {
        "has a name that matches the directory"() {
            expect(packageConfig.name, is, `@longlast/${dirName}`);
        },

        "is a module-type package"() {
            expect(packageConfig.type, is, "module");
        },

        "includes the dist directory in the published package"() {
            expect(packageConfig.files, equals, ["dist"]);
        },

        "directs imports to the dist/index.* files"() {
            expect(packageConfig.main, is, "dist/index.js");
            expect(packageConfig.types, is, "dist/index.d.ts");
        },

        "specifies a package manager version"() {
            expect(packageConfig.packageManager, is, "pnpm@10.14.0");
        },
    });
}
