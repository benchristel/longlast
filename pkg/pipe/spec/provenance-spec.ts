import {getBoundArguments, getUnapplied} from "@longlast/function-provenance";
import {type pipe} from "../src/index.ts";
import {expect, equals, is} from "@benchristel/taste";

type Spec = Record<string, () => void>;

export function provenanceSpec(_pipe: typeof pipe): Spec {
    return {
        "adds provenance information to the returned function"() {
            const f = (x: number) => x;
            const g = (x: number) => x;
            const piped = _pipe(f, g);
            expect(getBoundArguments(piped), equals, [f, g]);
            expect(getUnapplied(piped), is, _pipe);
            expect(piped.displayName, is, "pipe");
        },
    };
}
