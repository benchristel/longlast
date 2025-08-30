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
 *
 * `$name` is preferred over the native [`name`] property of functions for two
 * reasons:
 *
 * - Anonymous functions have an empty `name` property, and it is not possible
 *   to change the name after the function is created.
 * - The value of `name` is often changed by minification, since it's derived
 *   from an identifier in the source code.
 *
 * [`name`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
 */

export const $name: unique symbol = Symbol();
