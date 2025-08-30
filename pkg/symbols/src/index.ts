/**
 * @module symbols
 */

/**
 * Identifies a method that takes one argument and compares it to `this`,
 * returning `true` if the argument is equal to `this` and `false` otherwise.
 */

export const $equals: unique symbol = Symbol();

/**
 * Identifies a property of a function, which holds an array of arguments that
 * have been bound to this function by partial application.
 *
 * @see {@link curry}
 * @see https://en.wikipedia.org/wiki/Partial_application
 */

export const $boundArguments: unique symbol = Symbol();

/**
 * Identifies a property of a partially applied curried function, which holds
 * the original curried function with no arguments bound.
 *
 * @see {@link curry}
 * @see https://en.wikipedia.org/wiki/Partial_application
 */

export const $unapplied: unique symbol = Symbol();
