/**
 * @module any-function
 */

/**
 * Represents any function. Intended for use in type argument constraints.
 *
 * @see https://www.totaltypescript.com/any-considered-harmful#type-argument-constraints
 */

export type AnyFunction = (...args: any[]) => any;
