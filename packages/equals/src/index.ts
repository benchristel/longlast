/**
 * @module equals
 */

type Equatable = boolean

/**
 * Deeply compares two values, returning a boolean indicating whether they're
 * equal.
 */
export function equals(a: Equatable, b: Equatable): boolean {
    return a === b;
}
