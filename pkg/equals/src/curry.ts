type AnyFunction = (...args: any[]) => any;

type Func2<A, B, Out> = (a: A, b: B) => Out;

interface Curried1<A, Out> {
    (a: A): Out;
}

interface Curried2<A, B, Out> {
    (a: A): Curried1<B, Out>;
    (a: A, b: B): Out;
}

export function curry<A, B, Out>(f: Func2<A, B, Out>): Curried2<A, B, Out>;
export function curry(f: AnyFunction): AnyFunction {
    return function (a, b) {
        if (arguments.length === f.length) {
            return f(a, b);
        } else {
            return function (b: any) {
                return f(a, b);
            };
        }
    };
}
