import {startWith} from "#@longlast/flow";
import {describe, it, expect} from "tstyche";

describe("a Flow pipeline", () => {
    it("doesn't let you compose functions of the wrong types", () => {
        const flow = startWith(3);
        expect(flow.and).type.toBeCallableWith((x: number) => x);
        expect(flow.and).type.not.toBeCallableWith((s: string) => s);
    });

    it("produces a value of the correct type", () => {
        const value = startWith(3).and(String).evaluate();
        expect(value).type.toBe<string>();
    });
});
