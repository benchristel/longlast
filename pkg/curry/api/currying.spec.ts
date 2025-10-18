import {test, expect, equals, is} from "@benchristel/taste";
import {type curry} from "#@longlast/curry";

export function testFunctionCurrying(
    _curry: typeof curry,
    subjectName: string,
): void {
    const multiply = _curry((a: number, b: number) => a * b);

    test(`a curried function from ${subjectName}`, {
        "can be partially applied"() {
            expect([1, 2, 3].map(multiply(2)), equals, [2, 4, 6]);
        },

        "can be called normally"() {
            expect(multiply(3, 4), is, 12);
        },
    });

    test(`${subjectName}`, {
        "curries functions of up to 5 arguments"() {
            const add5 = _curry(
                (a: number, b: number, c: number, d: number, e: number) =>
                    a + b + c + d + e,
            );

            expect(add5(1)(2)(3)(4)(5), is, 15);
        },
    });
}
