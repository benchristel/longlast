export function curry(f: any): any {
    return function curried(...args: any[]): any {
        const numParameters = f.length;
        if (args.length < numParameters) {
            return (...moreArgs: any[]) => curried(...args, ...moreArgs);
        } else {
            return f(...args);
        }
    };
}
