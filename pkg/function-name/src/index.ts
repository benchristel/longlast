export function getFunctionName(f: AnyFunction): string {
    return (f as any).displayName ?? f.name;
}

(getFunctionName as any).displayName = "getFunctionName";

// TODO: duplicated
type AnyFunction = (...args: any[]) => any;
