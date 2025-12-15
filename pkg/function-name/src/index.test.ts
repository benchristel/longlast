import {test, expect, is} from "@benchristel/taste";
import {getFunctionName} from "./index.ts";

test("getFunctionName", {
    "is named"() {
        // Some minifiers mangle function names, so we need to set the
        // displayName.
        expect((getFunctionName as any).displayName, is, "getFunctionName");
    },

    "returns empty string given an anonymous function"() {
        expect(
            getFunctionName(() => {}),
            is,
            "",
        );
    },

    "returns the native name of a function"() {
        function foo() {}
        expect(getFunctionName(foo), is, "foo");
    },

    "prefers the displayName"() {
        function foo() {}
        foo.displayName = "the-display-name";
        expect(getFunctionName(foo), is, "the-display-name");
    },

    "prefers the displayName, even if empty"() {
        function foo() {}
        foo.displayName = "";
        expect(getFunctionName(foo), is, "");
    },
});
