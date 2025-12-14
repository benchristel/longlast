export function partialApply<Arg, Rest extends any[], Return>(
    arg: Arg,
    f: (a: Arg, ...rest: Rest) => Return,
): (...rest: Rest) => Return {
    return f.bind(null, arg);
}
