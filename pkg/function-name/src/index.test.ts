import {test, expect, is} from "@benchristel/taste";
import {getFunctionName, setFunctionName} from "./index.ts";

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

test("setFunctionName", {
    "customizes the name returned by getFunctionName"() {
        function foo() {}
        setFunctionName("changed", foo);
        expect(getFunctionName(foo), is, "changed");
    },

    "returns the function"() {
        function foo() {}
        const renamed = setFunctionName("changed", foo);
        expect(getFunctionName(renamed), is, "changed");
    },

    "is named"() {
        // Some minifiers mangle function names, so we need to set the
        // displayName.
        expect((setFunctionName as any).displayName, is, "setFunctionName");
    },
});
