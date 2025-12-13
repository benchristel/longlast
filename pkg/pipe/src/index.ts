export function pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C;
export function pipe(f: any, g: any): (x: any) => any {
    return (x) => g(f(x));
}
