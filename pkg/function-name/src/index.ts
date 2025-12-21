import {type AnyFunction} from "@longlast/any-function";

/**
 * Returns the name of the given function. If the `displayName`
 * property is present, it is used in preference to `name`.
 */

export function getFunctionName(f: AnyFunction): string {
    return (f as any).displayName ?? f.name;
}

(getFunctionName as any).displayName = "getFunctionName";
