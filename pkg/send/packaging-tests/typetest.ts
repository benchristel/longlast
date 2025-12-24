import {send} from "#@longlast/send";
import {describe, it, expect} from "tstyche";

describe("send", () => {
    it("is callable", () => {
        expect(send).type.toBeCallableWith("foo");
    });
});
