import {test, expect, is} from "@benchristel/taste";
import {equals} from "./index.ts";

import {arrayComparisonSpec} from "../api/array-comparison-spec.ts";
import {classInstanceComparisonSpec} from "../api/class-instance-comparison-spec.ts";
import {crossRealmObjectComparisonSpec} from "../api/cross-realm-object-comparison-spec.ts";
import {dateComparisonSpec} from "../api/date-comparison-spec.ts";
import {dollarEqualsMethodSpec} from "../api/dollar-equals-method-spec.ts";
import {errorComparisonSpec} from "../api/error-comparison-spec.ts";
import {functionComparisonSpec} from "../api/function-comparison-spec.ts";
import {mapComparisonSpec} from "../api/map-comparison-spec.ts";
import {objectComparisonSpec} from "../api/object-comparison-spec.ts";
import {primitiveComparisonSpec} from "../api/primitive-comparison-spec.ts";
import {regexpComparisonSpec} from "../api/regexp-comparison-spec.ts";
import {setComparisonSpec} from "../api/set-comparison-spec.ts";

import {curriedEqualsSpec} from "../api/spec.ts";

test("equals", objectComparisonSpec(equals));
test("equals", classInstanceComparisonSpec(equals));
test("equals", dollarEqualsMethodSpec(equals));
test("equals", primitiveComparisonSpec(equals));
test("equals", dateComparisonSpec(equals));
test("equals", regexpComparisonSpec(equals));
test("equals", arrayComparisonSpec(equals));
test("equals", setComparisonSpec(equals));
test("equals", mapComparisonSpec(equals));
test("equals", errorComparisonSpec(equals));
test("equals", functionComparisonSpec(equals));
test("equals", crossRealmObjectComparisonSpec(equals));
test("equals", curriedEqualsSpec(equals));

test("equals", {
    "handles an object with a reference cycle"() {
        // Characterization test: this behavior is unsupported.
        const obj: {x: unknown} = {x: null};
        obj.x = obj;
        expect(equals(obj, obj), is, true);
    },

    "throws given two objects with different reference cycles"() {
        // Characterization test: this behavior is unsupported.
        const a: {x: unknown} = {x: null};
        const b: {x: unknown} = {x: null};
        a.x = a;
        b.x = b;
        expect(
            throws(() => equals(a, b)),
            is,
            true,
        );
    },
});

function throws(f: () => unknown) {
    try {
        f();
        return false;
    } catch {
        return true;
    }
}
