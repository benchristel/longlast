import {test} from "@benchristel/taste";
import {success} from "#@longlast/result";

test("the result package", {
    "exports callable functions"() {
        success(3);
    },
});
