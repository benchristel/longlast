export function pipe<A, B, C, D>(
    f: (a: A) => B,
    g: (b: B) => C,
    h: (c: C) => D,
): (a: A) => D;
export function pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C;
export function pipe(...fs: any): (x: any) => any {
    return fs.reduceRight(compose);
}

function compose(f: any, g: any): any {
    return (x: any) => f(g(x));
}
