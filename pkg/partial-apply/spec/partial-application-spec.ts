import {type partialApply} from "#@longlast/partial-apply";
import {expect, is} from "@benchristel/taste";

type Spec = Record<string, () => void>;

export function partialApplicationSpec(
    _partialApply: typeof partialApply,
): Spec {
    return {
        "binds the first argument to a function"() {
            const concat = (a: string, b: string) => a + b;

            const toUsername = _partialApply("@", concat);

            expect(toUsername("elias"), is, "@elias");
        },

        "binds a function's only argument, creating a thunk"() {
            const negate = (x: number) => -x;

            const lazyNegativeOne = _partialApply(1, negate);

            expect(lazyNegativeOne(), is, -1);
        },
    };
}
