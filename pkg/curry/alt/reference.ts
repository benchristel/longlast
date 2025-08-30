export function curry(f: any): any {
    const curried = nameAfter(f, (...args: any[]): any =>
        args.length < f.length
            ? nameAfter(curried, (...moreArgs: any[]) =>
                  curried(...args, ...moreArgs),
              )
            : f(...args),
    );
    return curried;
}

function nameAfter(original: any, f: any): any {
    f.displayName = original.displayName ?? original.name;
    return f;
}
