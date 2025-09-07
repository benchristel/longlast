/**
 * Identifies a property of a function, which holds an array of arguments that
 * have been bound to this function by partial application.
 *
 * @deprecated as of `@longlast/symbols@1.1.0`.
 * Use {@link symbols.$getBoundArguments $getBoundArguments} instead
 * @see {@link curry}
 * @see https://en.wikipedia.org/wiki/Partial_application
 */

export const $boundArguments: unique symbol = Symbol();
