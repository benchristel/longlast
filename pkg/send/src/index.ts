/**
 * @module send
 */

export function send<M extends string, Args extends any[]>(
    message: M,
    ...args: Args
): <Receiver extends {[Method in M]: (...args: Args) => any}>(
    r: Receiver,
) => ReturnType<Receiver[M]> {
    message satisfies M;
    return <Receiver extends {[Method in M]: (...args: Args) => any}>(
        receiver: Receiver,
    ) => receiver[message](...args);
}
