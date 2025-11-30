import {expect, is} from "@benchristel/taste";
import {type equals} from "#@longlast/equals";

type Spec = Record<string, () => void>;

export function curriedEqualsSpec(_equals: typeof equals): Spec {
    return {
        "is curried"() {
            expect(_equals(42)(42), is, true);
        },

        "ignores extra arguments"() {
            // `map()` passes the index and array to each invocation of
            // `_equals(1)`.
            expect([0, 1, 2].map(_equals(1)).join(","), is, "false,true,false");
        },
    };
}
