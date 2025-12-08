import {test, expect, is} from "@benchristel/taste";
import {equals, equalsWith} from "./index.ts";

import {arrayComparisonSpec} from "../spec/array-comparison-spec.ts";
import {classInstanceComparisonSpec} from "../spec/class-instance-comparison-spec.ts";
import {crossRealmObjectComparisonSpec} from "../spec/cross-realm-object-comparison-spec.ts";
import {curriedEqualsSpec} from "../spec/curried-equals-spec.ts";
import {dateComparisonSpec} from "../spec/date-comparison-spec.ts";
import {dollarEqualsMethodSpec} from "../spec/dollar-equals-method-spec.ts";
import {errorComparisonSpec} from "../spec/error-comparison-spec.ts";
import {functionComparisonSpec} from "../spec/function-comparison-spec.ts";
import {mapComparisonSpec} from "../spec/map-comparison-spec.ts";
import {objectComparisonSpec} from "../spec/object-comparison-spec.ts";
import {primitiveComparisonSpec} from "../spec/primitive-comparison-spec.ts";
import {regexpComparisonSpec} from "../spec/regexp-comparison-spec.ts";
import {setComparisonSpec} from "../spec/set-comparison-spec.ts";

import {equalsWithSpec} from "../spec/equals-with-spec.ts";

test("equals", arrayComparisonSpec(equals));
test("equals", classInstanceComparisonSpec(equals));
test("equals", crossRealmObjectComparisonSpec(equals));
test("equals", curriedEqualsSpec(equals));
test("equals", dateComparisonSpec(equals));
test("equals", dollarEqualsMethodSpec(equals));
test("equals", errorComparisonSpec(equals));
test("equals", functionComparisonSpec(equals));
test("equals", mapComparisonSpec(equals));
test("equals", objectComparisonSpec(equals));
test("equals", primitiveComparisonSpec(equals));
test("equals", regexpComparisonSpec(equals));
test("equals", setComparisonSpec(equals));

test("equalsWith", equalsWithSpec(equalsWith));

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
