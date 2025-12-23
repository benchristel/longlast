import {type partialApply} from "#@longlast/partial-apply";
import {expect, equals, is} from "@benchristel/taste";
import {getBoundArguments, getUnapplied} from "@longlast/function-provenance";
import {getFunctionName} from "@longlast/function-name";

type Spec = Record<string, () => void>;

const f = (x: number, s: string, b: boolean) => `${x}${s}${b}`;

export function provenanceSpec(_partialApply: typeof partialApply): Spec {
    return {
        "tracks bound arguments"() {
            const applied = _partialApply(1, f);
            expect(getBoundArguments(applied), equals, [1]);
        },

        "tracks bound arguments across multiple calls"() {
            const applied = _partialApply("a", _partialApply(1, f));
            expect(getBoundArguments(applied), equals, [1, "a"]);
        },

        "retains the original function name"() {
            function add(a: number, b: number) {
                return a + b;
            }

            const applied = _partialApply(1, add);

            expect(getFunctionName(applied), is, "add");
        },

        "keeps a reference to the unapplied function"() {
            const applied = _partialApply(1, f);
            expect(getUnapplied(applied), is, f);
        },

        "tracks the unapplied function across multiple calls"() {
            const applied1 = _partialApply(1, f);
            const applied2 = _partialApply("", applied1);
            expect(getUnapplied(applied2), is, f);
        },
    };
}
