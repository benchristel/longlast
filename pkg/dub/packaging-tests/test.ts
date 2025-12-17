import {test} from "@benchristel/taste";
import {dub} from "#@longlast/dub";

test("dub", {
    "is callable"() {
        dub("", () => {});
    },
});
