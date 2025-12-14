/**
 * @module pipe
 */

export function pipe<A, B, C, D, E>(
    f: (a: A) => B,
    g: (b: B) => C,
    h: (c: C) => D,
    i: (d: D) => E,
): (a: A) => E;

export function pipe<A, B, C, D>(
    f: (a: A) => B,
    g: (b: B) => C,
    h: (c: C) => D,
): (a: A) => D;

export function pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C;

/**
 * [Composes] functions left-to-right.
 *
 * [Composes]: https://en.wikipedia.org/wiki/Function_composition
 *
 * @example
 * ```ts
 * import {pipe} from "@longlast/pipe";
 *
 * // Function definitions omitted for brevity. See `pipe/spec/test.ts` for a
 * // working example.
 *
 * const capitalize = pipe(
 *     split(""),
 *     mapAt(0, toUpperCase),
 *     join(""),
 * );
 *
 * const pascalCase = pipe(
 *     split(/\W+/),
 *     map(capitalize),
 *     join(""),
 * );
 *
 * pascalCase("chunky-bacon"); // => "ChunkyBacon"
 * ```
 *
 * [reverse composition]: https://en.wikipedia.org/wiki/Function_composition
 */

export function pipe(...fs: any): (x: any) => any {
    return fs.reduceRight(compose);
}

function compose(f: any, g: any): any {
    return (x: any) => f(g(x));
}
