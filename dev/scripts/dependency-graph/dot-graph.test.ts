import {test, expect, is, trimMargin} from "@benchristel/taste";
import {dotGraph} from "./dot-graph.ts";

test("a list of package dependencies from pnpm", {
    "converts to dot format"() {
        const pnpmList = [
            {
                name: "@longlast/pipe",
                dependencies: {
                    "@longlast/function-provenance": {},
                    "@longlast/curry": {},
                },
            },
            {
                name: "@longlast/function-provenance",
                dependencies: {
                    "@longlast/symbols": {},
                },
            },
        ];

        const dot = trimMargin`
            digraph {
                "@longlast/pipe" -> "@longlast/function-provenance"
                "@longlast/pipe" -> "@longlast/curry"
                "@longlast/function-provenance" -> "@longlast/symbols"
            }
        `;

        expect(dotGraph(pnpmList), is, dot);
    },

    "handles packages with no dependencies"() {
        const pnpmList = [{name: "@longlast/symbols"}];

        const dot = "digraph {\n}";

        expect(dotGraph(pnpmList), is, dot);
    },
});
