/*

Each package's readme should have:

- A title

- Installation instructions

```bash
# Use your favorite package manager
npm add @longlast/equals
yarn add @longlast/equals
pnpm add @longlast/equals
```

- A link to the docs (which don't yet exist)

https://longlast.js.org/reference/equals

*/

import {test, expect, trimMargin} from "@benchristel/taste";
import {glob, readFile} from "node:fs/promises";
import {join} from "node:path";

const root = join(import.meta.dirname, "..", "..");

for await (const dirPath of glob(join(root, "pkg", "*"))) {
    const path = join(dirPath, "README.md");
    const readme = await readFile(path, "utf-8");
    const dirName = dirPath.match(/\/pkg\/([^/]+)$/)?.[1];

    test(`${path}`, {
        "has a level-one heading containing the package name"() {
            // We use backticks to format the package name as code in order to
            // avoid at-mentioning @longlast on GitHub — that's not us,
            // unfortunately!
            const expected = trimMargin(`
                # \`@longlast/${dirName}\`
            `);

            expect(readme, startsWith, expected);
        },

        "has an Install section"() {
            // We use backticks to format the package name as code in order to
            // avoid at-mentioning @longlast on GitHub — that's not us,
            // unfortunately!
            const expected = trimMargin(`
                ## Install

                Choose your favorite package manager:

                \`\`\`bash
                npm  add @longlast/${dirName}
                pnpm add @longlast/${dirName}
                yarn add @longlast/${dirName}
                \`\`\`
            `);

            expect(readme, contains, expected);
        },

        "links to the documentation"() {
            const expected = trimMargin(`
                ## Documentation

                [Browse the docs on longlast.js.org][docs].

                [docs]: https://longlast.js.org/${dirName}/
            `);

            expect(readme, contains, expected);
        },
    });
}

function startsWith(prefix: string, text: string): boolean {
    return text.startsWith(prefix);
}

function contains(substring: string, text: string): boolean {
    return text.includes(substring);
}
