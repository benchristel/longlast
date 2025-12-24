/**
 * @module send
 */

export function send<M extends string, Args extends any[]>(
    message: M,
    ...args: Args
): <Return>(receiver: {[Method in M]: (...args: Args) => Return}) => Return {
    message satisfies M;
    return <Return>(receiver: {[Method in M]: (...args: Args) => Return}) =>
        receiver[message](...args);
}
