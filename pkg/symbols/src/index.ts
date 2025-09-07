/**
 * @module symbols
 */

export {$boundArguments} from "./deprecated.ts";

/**
 * Identifies a method that takes one argument and compares it to `this`,
 * returning `true` if the argument is equal to `this` and `false` otherwise.
 *
 * @see {@link equals}
 */

export const $equals: unique symbol = Symbol();

/**
 * Identifies a method on a function, which returns an array of the arguments
 * that have been bound to the function by partial application.
 *
 * @see {@link curry}
 * @see https://en.wikipedia.org/wiki/Partial_application
 */

export const $getBoundArguments: unique symbol = Symbol();

/**
 * Identifies a property of a partially applied curried function, which holds
 * the original curried function with no arguments bound.
 *
 * @see {@link curry}
 * @see https://en.wikipedia.org/wiki/Partial_application
 */

export const $unapplied: unique symbol = Symbol();
