import {test} from "@benchristel/taste";
import fastDeepEqual from "fast-deep-equal/es6/index.js";

import {arrayComparisonSpec} from "../spec/array-comparison-spec.ts";
import {classInstanceComparisonSpec} from "../spec/class-instance-comparison-spec.ts";
import {dateComparisonSpec} from "../spec/date-comparison-spec.ts";
import {errorComparisonSpec} from "../spec/error-comparison-spec.ts";
import {functionComparisonSpec} from "../spec/function-comparison-spec.ts";
import {mapComparisonSpec} from "../spec/map-comparison-spec.ts";
import {objectComparisonSpec} from "../spec/object-comparison-spec.ts";
import {primitiveComparisonSpec} from "../spec/primitive-comparison-spec.ts";
import {regexpComparisonSpec} from "../spec/regexp-comparison-spec.ts";
import {setComparisonSpec} from "../spec/set-comparison-spec.ts";
import {typedArrayComparisonSpec} from "../spec/typed-array-comparison-spec.ts";

const unimplemented = [
    // The lack of distinction between positive and negative zero makes
    // fast-deep-equal/es6 inconsistent. Within Sets, 0 and -0 are treated as
    // unequal, but elsewhere, they are treated as equal.
    "distinguishes -0 from 0",
    // fast-deep-equal has a bug where the presence of non-enumerable
    // properties on an object makes equality comparisons involving that object
    // non-commutative.
    "ignores non-enumerable properties",
    // fast-deep-equal throws an exception given objects with null prototypes.
    "equates objects with no prototypes",
    "equates invalid Dates",
    // Comparing partially-applied functions by value is the "killer feature"
    // of longlast. Implementing this feature requires that `curry` and
    // `equals` both know about some shared protocol.
    "equates partial applications with equal arguments",
    "respects asymmetric comparisons between map values",
];

const specs = [
    primitiveComparisonSpec,
    objectComparisonSpec,
    arrayComparisonSpec,
    classInstanceComparisonSpec,
    dateComparisonSpec,
    errorComparisonSpec,
    functionComparisonSpec,
    mapComparisonSpec,
    regexpComparisonSpec,
    setComparisonSpec,
    typedArrayComparisonSpec,
];

for (const spec of specs) {
    test("fastDeepEqual", except(unimplemented, spec(fastDeepEqual)));
}

function except<T>(
    excludedKeys: string[],
    object: Record<string, T>,
): Record<string, T> {
    const copy = {...object};
    for (const key of excludedKeys) {
        delete copy[key];
    }
    return copy;
}
