import {type AnyFunction} from "@longlast/any-function";

export function getFunctionName(f: AnyFunction): string {
    return (f as any).displayName ?? f.name;
}

(getFunctionName as any).displayName = "getFunctionName";
