import {type pipe} from "../src/index.ts";
import {expect, is} from "@benchristel/taste";

type Spec = Record<string, () => void>;

export function reverseCompositionSpec(_pipe: typeof pipe): Spec {
    const split = (pattern: string | RegExp) => (str: string) =>
        str.split(pattern);
    const map =
        <T, U>(f: (x: T) => U) =>
        (array: T[]) =>
            array.map((elem) => f(elem));
    const mapAt =
        <T>(idx: number, f: (x: T) => T) =>
        (array: T[]) =>
            array.map((e, i) => (i === idx ? f(e) : e));
    const join = (delim: string) => (strs: string[]) => strs.join(delim);
    const toUpperCase = (s: string) => s.toUpperCase();

    return {
        "pipes functions together"() {
            const capitalize = _pipe(
                split(""),
                mapAt(0, toUpperCase),
                join(""),
            );

            const pascalCase = _pipe(split(/\W+/), map(capitalize), join(""));

            expect(pascalCase("chunky-bacon"), is, "ChunkyBacon");
        },
    };
}
