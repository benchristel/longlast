import {test, expect, is} from "@benchristel/taste";
import {type curry} from "#@longlast/curry";

export function behavesLikeCurry(_curry: typeof curry, name: string): void {
    test(name, {
        "returns a function"() {
            expect(typeof _curry(() => {}), is, "function");
        },
    });

    const curriedConcat2 = _curry((s: string, x: number) => s + x);

    test(`a 2-ary function from ${name}`, {
        "can be passed both arguments at once"() {
            expect(curriedConcat2("a", 1), is, "a1");
        },

        "can be passed its arguments one at a time"() {
            expect(curriedConcat2("a")(1), is, "a1");
        },
    });

    const curriedConcat3 = _curry(
        (s: string, x: number, b: boolean) => s + x + b,
    );

    test(`a 3-ary function from ${name}`, {
        "can be passed all arguments at once"() {
            expect(curriedConcat3("a", 1, true), is, "a1true");
        },

        "can be passed its arguments one at a time"() {
            expect(curriedConcat3("a")(1)(true), is, "a1true");
        },

        "can be passed two arguments, then one"() {
            expect(curriedConcat3("a", 1)(true), is, "a1true");
        },

        "can be passed one argument, then two"() {
            expect(curriedConcat3("a")(1, true), is, "a1true");
        },
    });
}
