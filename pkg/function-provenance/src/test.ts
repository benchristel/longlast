import {test, expect, equals, is} from "@benchristel/taste";
import {getBoundArguments, getUnapplied, trackProvenance} from "./index.ts";
import {$getBoundArguments, $unapplied} from "@longlast/symbols";
import {getFunctionName} from "@longlast/function-name";

test("getBoundArguments", {
    "returns empty given a plain function"() {
        const f = () => {};
        expect(getBoundArguments(f), equals, []);
    },

    "delegates to [$getBoundArguments]"() {
        const f = () => {};
        (f as any)[$getBoundArguments] = () => ["foo"];
        expect(getBoundArguments(f), equals, ["foo"]);
    },
});

test("getUnapplied", {
    "returns a function's [$unapplied] property"() {
        const f = () => {};
        (f as any)[$unapplied] = "the value";
        expect(getUnapplied(f), is, "the value");
    },

    "defaults to returning the function itself"() {
        const f = () => {};
        expect(getUnapplied(f), is, f);
    },
});

test("trackProvenance", {
    "appends the given arguments to the source function's bound arguments"() {
        const source = () => {};
        const dest1 = () => {};
        const dest2 = () => {};

        trackProvenance(source, [1], dest1);

        expect(getBoundArguments(dest1), equals, [1]);

        trackProvenance(dest1, [2, 3], dest2);

        expect(getBoundArguments(dest2), equals, [1, 2, 3]);
    },

    "transfers the source's name to the destination function"() {
        const source = () => {};
        const dest = () => {};

        trackProvenance(source, [], dest);

        expect(getFunctionName(dest), equals, "source");
    },

    "sets the source as the destination's [$unapplied]"() {
        const source = () => {};
        const dest = () => {};

        trackProvenance(source, [], dest);

        expect(getUnapplied(dest), is, source);
    },

    "transfers the source's [$unapplied] to the destination"() {
        const source = () => {};
        const unapplied = () => {};
        (source as any)[$unapplied] = unapplied;
        const dest = () => {};

        trackProvenance(source, [], dest);

        expect(getUnapplied(dest), is, unapplied);
    },
});
