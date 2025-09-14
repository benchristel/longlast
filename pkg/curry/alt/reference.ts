export function curry(f: any): any {
    return function curried(...args: any[]): any {
        return args.length < f.length
            ? (...moreArgs: any[]) => curried(...args, ...moreArgs)
            : f(...args);
    };
}
