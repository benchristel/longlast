import {type AnyFunction} from "@longlast/any-function";

/**
 * Returns the name of the given function. If the `displayName` property is
 * present, it is used in preference to `name`.
 */

export function getFunctionName(f: AnyFunction): string {
    return (f as any).displayName ?? f.name;
}

(getFunctionName as any).displayName = "getFunctionName";

/**
 * Assigns the `name` to the given function. Note that this is a mutating
 * operation!
 */

export function setFunctionName<F extends AnyFunction>(name: string, f: F): F {
    (f as any).displayName = name;
    return f;
}

(setFunctionName as any).displayName = "setFunctionName";
