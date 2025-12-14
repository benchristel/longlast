import {type partialApply} from "#@longlast/partial-apply";
import {expect, is} from "@benchristel/taste";

type Spec = Record<string, () => void>;

export function isCurriedSpec(_partialApply: typeof partialApply): Spec {
    return {
        "is curried"() {
            const concat = (a: string, b: string) => a + b;

            const toUsername = _partialApply("@")(concat);

            expect(toUsername("elias"), is, "@elias");
        },
    };
}
