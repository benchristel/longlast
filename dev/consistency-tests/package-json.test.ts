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

        "uses ES6 Modules"() {
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

        "has a description"() {
            expect(typeof packageConfig.description, is, "string");
        },

        "links to the homepage"() {
            expect(packageConfig.homepage, is, "https://longlast.js.org/");
        },

        "links to the GitHub repository"() {
            // TODO: should this use the object form so we can link to the
            // directory within the repository? See:
            // https://docs.npmjs.com/cli/v8/configuring-npm/package-json#repository
            expect(packageConfig.repository, is, "github:benchristel/longlast");
        },

        "is MIT-licensed"() {
            expect(packageConfig.license, is, "MIT");
        },

        "is authored by Ben Christel"() {
            expect(
                packageConfig.author,
                is,
                "Ben Christel (https://benchristel.com/)",
            );
        },

        "declares whether it has side effects"() {
            expect(typeof packageConfig.sideEffects, is, "boolean");
        },

        "uses the version of @longlast/symbols from the pnpm catalog"() {
            // All packages must use the same version of @longlast/symbols
            // during development. Each version exports different unique symbol
            // types, and using them together causes type errors.
            const version = packageConfig.dependencies?.["@longlast/symbols"];
            expect(version, either(is("catalog:"), is(undefined)));
        },

        "defines properties in the order they appear in the NPM docs"() {
            // See: https://docs.npmjs.com/cli/v8/configuring-npm/package-json
            const order = [
                "name",
                "version",
                "description",
                "keywords",
                "homepage",
                "bugs",
                "license",
                "author",
                "contributors",
                "funding",
                "files",
                "main",
                "browser",
                "bin",
                "man",
                "directories",
                "repository",
                "sideEffects", // Not documented on npmjs.com
                "packageManager", // Not documented on npmjs.com
                "imports", // Not documented on npmjs.com
                "scripts",
                "config",
                "dependencies",
                "devDependencies",
                "peerDependencies",
                "peerDependenciesMeta",
                "bundleDependencies",
                "optionalDependencies",
                "overrides",
                "engines",
                "os",
                "cpu",
                "private",
                "publishConfig",
                "workspaces",
            ];

            expect(Object.keys(packageConfig), appearInSameOrderAs, order);
        },
    });
}

type Predicate = (x: unknown) => boolean;

function either(...predicates: Array<Predicate>): Predicate {
    const or = (arg: unknown) => (state: boolean, predicate: Predicate) =>
        state || predicate(arg);
    return (arg: unknown) => predicates.reduce(or(arg), false);
}

// TODO: consider giving this function its own package.
function appearInSameOrderAs(as: string[], bs: string[]): boolean {
    const aSet = new Set(as);
    const bSet = new Set(bs);
    const intersectionInBOrder = bs.filter((b) => aSet.has(b));
    const intersectionInAOrder = as.filter((a) => bSet.has(a));

    if (intersectionInBOrder.length !== intersectionInAOrder.length) {
        throw Error(
            "appearInSameOrderAs: invariant failed! Intersection arrays are not the same length.",
        );
    }

    return intersectionInBOrder.every((b, i) => b === intersectionInAOrder[i]);
}
