export function curry(f: any): any {
    return function curried(...args: any[]) {
        if (args.length < f.length) {
            return (...moreArgs: any[]) => curried(...args, ...moreArgs);
        } else {
            return f(...args);
        }
    };
}
