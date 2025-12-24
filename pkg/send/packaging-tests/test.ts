import {test, expect, is} from "@benchristel/taste";
import {send} from "#@longlast/send";

test("send", {
    "sends a message to an object"() {
        const object = {
            greet() {
                return "hi";
            },
        };

        expect(send("greet")(object), is, "hi");
    },
});
