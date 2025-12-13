// TODO: types
export function pipe(f: any, g: any): (x: any) => any {
    return (x) => g(f(x));
}
