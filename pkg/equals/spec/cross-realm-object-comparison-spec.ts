import {expect, is} from "@benchristel/taste";
import {createContext, runInContext} from "node:vm";

type EqualsFn = (a: unknown, b: unknown) => boolean;
type Spec = Record<string, () => void>;

export function crossRealmObjectComparisonSpec(_equals: EqualsFn): Spec {
    return {
        "equates objects from different realms"() {
            const a = createCrossRealmObject("{x: 1}");
            const b = createCrossRealmObject("{x: 1}");

            expect(_equals(a, b), is, true);
            expect(_equals(a, {x: 1}), is, true);
        },

        "equates Arrays from different realms"() {
            const a = createCrossRealmObject("[1]");
            const b = createCrossRealmObject("[1]");

            expect(_equals(a, b), is, true);
            expect(_equals(a, [1]), is, true);
        },

        "equates Dates from different realms"() {
            const a = createCrossRealmObject("new Date(42)");
            const b = createCrossRealmObject("new Date(42)");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new Date(42)), is, true);
        },

        "equates RegExps from different realms"() {
            const a = createCrossRealmObject("/a/i");
            const b = createCrossRealmObject("/a/i");

            expect(_equals(a, b), is, true);
            expect(_equals(a, /a/i), is, true);
        },

        "equates Errors from different realms"() {
            const a = createCrossRealmObject("new Error('kablooie')");
            const b = createCrossRealmObject("new Error('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new Error("kablooie")), is, true);
        },

        "equates EvalErrors from different realms"() {
            const a = createCrossRealmObject("new EvalError('kablooie')");
            const b = createCrossRealmObject("new EvalError('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new EvalError("kablooie")), is, true);
        },

        "equates RangeErrors from different realms"() {
            const a = createCrossRealmObject("new RangeError('kablooie')");
            const b = createCrossRealmObject("new RangeError('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new RangeError("kablooie")), is, true);
        },

        "equates ReferenceErrors from different realms"() {
            const a = createCrossRealmObject("new ReferenceError('kablooie')");
            const b = createCrossRealmObject("new ReferenceError('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new ReferenceError("kablooie")), is, true);
        },

        "equates SyntaxErrors from different realms"() {
            const a = createCrossRealmObject("new SyntaxError('kablooie')");
            const b = createCrossRealmObject("new SyntaxError('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new SyntaxError("kablooie")), is, true);
        },

        "equates TypeErrors from different realms"() {
            const a = createCrossRealmObject("new TypeError('kablooie')");
            const b = createCrossRealmObject("new TypeError('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new TypeError("kablooie")), is, true);
        },

        "equates URIErrors from different realms"() {
            const a = createCrossRealmObject("new URIError('kablooie')");
            const b = createCrossRealmObject("new URIError('kablooie')");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new URIError("kablooie")), is, true);
        },

        "equates Sets from different realms"() {
            const a = createCrossRealmObject("new Set([1])");
            const b = createCrossRealmObject("new Set([1])");

            expect(_equals(a, b), is, true);
            expect(_equals(a, new Set([1])), is, true);
        },

        "equates Int8Arrays from different realms"() {
            const a = createCrossRealmObject("new Int8Array([1])");
            const b = createCrossRealmObject("new Int8Array([1])");

            expect(_equals(a, b), is, true);
        },

        "equates Uint8ClampedArrays from different realms"() {
            const a = createCrossRealmObject("new Uint8ClampedArray([1])");
            const b = createCrossRealmObject("new Uint8ClampedArray([1])");

            expect(_equals(a, b), is, true);
        },

        "equates Int16Arrays from different realms"() {
            const a = createCrossRealmObject("new Int16Array([1])");
            const b = createCrossRealmObject("new Int16Array([1])");

            expect(_equals(a, b), is, true);
        },

        "equates Uint16Arrays from different realms"() {
            const a = createCrossRealmObject("new Uint16Array([1])");
            const b = createCrossRealmObject("new Uint16Array([1])");

            expect(_equals(a, b), is, true);
        },

        "equates Int32Arrays from different realms"() {
            const a = createCrossRealmObject("new Int32Array([1])");
            const b = createCrossRealmObject("new Int32Array([1])");

            expect(_equals(a, b), is, true);
        },

        "equates Uint32Arrays from different realms"() {
            const a = createCrossRealmObject("new Uint32Array([1])");
            const b = createCrossRealmObject("new Uint32Array([1])");

            expect(_equals(a, b), is, true);
        },

        "equates Float16Arrays from different realms"() {
            const a = createCrossRealmObject("new Float16Array([1])");
            const b = createCrossRealmObject("new Float16Array([1])");

            expect(_equals(a, b), is, true);
        },

        "equates Float32Arrays from different realms"() {
            const a = createCrossRealmObject("new Float32Array([1])");
            const b = createCrossRealmObject("new Float32Array([1])");

            expect(_equals(a, b), is, true);
        },

        "equates Float64Arrays from different realms"() {
            const a = createCrossRealmObject("new Float64Array([1])");
            const b = createCrossRealmObject("new Float64Array([1])");

            expect(_equals(a, b), is, true);
        },

        "equates BigInt64Arrays from different realms"() {
            const a = createCrossRealmObject("new BigInt64Array([1n])");
            const b = createCrossRealmObject("new BigInt64Array([1n])");

            expect(_equals(a, b), is, true);
        },

        "equates BigUint64Arrays from different realms"() {
            const a = createCrossRealmObject("new BigUint64Array([1n])");
            const b = createCrossRealmObject("new BigUint64Array([1n])");

            expect(_equals(a, b), is, true);
        },

        "equates Uint8Arrays from different realms"() {
            const a = createCrossRealmObject("new Uint8Array([1])");
            const b = createCrossRealmObject("new Uint8Array([1])");

            expect(_equals(a, b), is, true);
        },
    };
}

function createCrossRealmObject(expression: string): unknown {
    const context = createContext({});
    return runInContext(`const value = (${expression}); value`, context);
}
