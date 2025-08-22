/**
 * @module curry
 */

// TODO: move this type to its own package
type AnyFunction = (...args: any[]) => any;

type Func2<A, B, Out> = (a: A, b: B) => Out;

export interface Curried2<A, B, Out> {
    (a: A, b: B): Out;
    (a: A): (b: B) => Out;
}

/**
 * Returns a *curried* version of the given function `f`. The returned function
 * behaves just like `f`, except that, if is passed fewer arguments than `f`
 * requires, it does nothing but return a new function that takes the remaining
 * arguments. `f` is called once all arguments have been supplied.
 */

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
