/**
 * @module symbols
 */

/**
 * Identifies a method that takes one argument and compares it to `this`,
 * returning `true` if the argument is equal to `this` and `false` otherwise.
 */

export const $equals: unique symbol = Symbol();

/**
 * Identifies a property that stores a human-readable name for this object
 * (which is usually a function or class). The value of the `$name` property
 * should be a string.
 */

export const $name: unique symbol = Symbol();
