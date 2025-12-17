export function functionName(f: AnyFunction): string {
    return (f as any).displayName ?? f.name;
}

(functionName as any).displayName = "functionName";

// TODO: duplicated
type AnyFunction = (...args: any[]) => any;
