import {type pipe} from "../src/index.ts";
import {expect, equals, is} from "@benchristel/taste";
import {$getBoundArguments, $unapplied} from "@longlast/symbols";

type Spec = Record<string, () => void>;

export function provenanceSpec(_pipe: typeof pipe): Spec {
    return {
        "adds provenance information to the returned function"() {
            const f = (x: number) => x;
            const g = (x: number) => x;
            const piped = _pipe(f, g);
            expect(piped[$getBoundArguments](), equals, [f, g]);
            expect(piped[$unapplied], is, _pipe);
            expect(piped.displayName, is, "pipe");
        },
    };
}
