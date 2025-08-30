import {$boundArguments, $unapplied} from "@longlast/symbols";

export function curry(f: any): any {
    const curried = addMetadata(f, [], (...args: any[]): any =>
        args.length < f.length
            ? addMetadata(curried, args, (...moreArgs: any[]) =>
                  curried(...args, ...moreArgs),
              )
            : f(...args),
    );
    return curried;
}

function addMetadata(original: any, args: any[], f: any): any {
    f.displayName = original.displayName ?? original.name;
    f[$boundArguments] = args;
    f[$unapplied] = original[$unapplied] ?? f;
    return f;
}
