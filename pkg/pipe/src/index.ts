/**
 * @module pipe
 */

import type {FunctionProvenance} from "@longlast/function-provenance";
import {$getBoundArguments, $unapplied} from "@longlast/symbols";

export interface Piped<Arg, Return> extends FunctionProvenance {
    (arg: Arg): Return;
}

export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
    f: (a: A) => B,
    g: (b: B) => C,
    h: (c: C) => D,
    i: (d: D) => E,
    j: (e: E) => F,
    k: (f: F) => G,
    l: (g: G) => H,
    m: (h: H) => I,
    n: (i: I) => J,
    o: (j: J) => K,
): Piped<A, K>;

export function pipe<A, B, C, D, E, F, G, H, I, J>(
    f: (a: A) => B,
    g: (b: B) => C,
    h: (c: C) => D,
    i: (d: D) => E,
    j: (e: E) => F,
    k: (f: F) => G,
    l: (g: G) => H,
    m: (h: H) => I,
    n: (i: I) => J,
): Piped<A, J>;

export function pipe<A, B, C, D, E, F, G, H, I>(
    f: (a: A) => B,
    g: (b: B) => C,
    h: (c: C) => D,
    i: (d: D) => E,
    j: (e: E) => F,
    k: (f: F) => G,
    l: (g: G) => H,
    m: (h: H) => I,
): Piped<A, I>;

export function pipe<A, B, C, D, E, F, G, H>(
    f: (a: A) => B,
    g: (b: B) => C,
    h: (c: C) => D,
    i: (d: D) => E,
    j: (e: E) => F,
    k: (f: F) => G,
    l: (g: G) => H,
): Piped<A, H>;

export function pipe<A, B, C, D, E, F, G>(
    f: (a: A) => B,
    g: (b: B) => C,
    h: (c: C) => D,
    i: (d: D) => E,
    j: (e: E) => F,
    k: (f: F) => G,
): Piped<A, G>;

export function pipe<A, B, C, D, E, F>(
    f: (a: A) => B,
    g: (b: B) => C,
    h: (c: C) => D,
    i: (d: D) => E,
    j: (e: E) => F,
): Piped<A, F>;

export function pipe<A, B, C, D, E>(
    f: (a: A) => B,
    g: (b: B) => C,
    h: (c: C) => D,
    i: (d: D) => E,
): Piped<A, E>;

export function pipe<A, B, C, D>(
    f: (a: A) => B,
    g: (b: B) => C,
    h: (c: C) => D,
): Piped<A, D>;

export function pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): Piped<A, C>;

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
 * ## Limitations
 *
 * The types for `pipe` only support composing up to ten functions at a time.
 */

export function pipe(...fs: any): (x: any) => any {
    const piped = fs.reduceRight(compose);
    piped[$getBoundArguments] = () => fs;
    piped[$unapplied] = pipe;
    piped.displayName = "pipe";
    return piped;
}

function compose(f: any, g: any): any {
    return (x: any) => f(g(x));
}
