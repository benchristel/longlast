import {test, expect, is} from "@benchristel/taste";
import {functionName} from "./index.ts";

test("functionName", {
    "is named"() {
        // Some minifiers mangle function names, so we need to set the
        // displayName.
        expect((functionName as any).displayName, is, "functionName");
    },

    "returns empty string given an anonymous function"() {
        expect(
            functionName(() => {}),
            is,
            "",
        );
    },

    "returns the native name of a function"() {
        function foo() {}
        expect(functionName(foo), is, "foo");
    },

    "prefers the displayName"() {
        function foo() {}
        foo.displayName = "the-display-name";
        expect(functionName(foo), is, "the-display-name");
    },

    "prefers the displayName, even if empty"() {
        function foo() {}
        foo.displayName = "";
        expect(functionName(foo), is, "");
    },
});
