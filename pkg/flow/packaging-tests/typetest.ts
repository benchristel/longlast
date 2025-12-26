import {Flow, startWith} from "#@longlast/flow";
import {describe, it, expect} from "tstyche";

describe("a Flow pipeline", () => {
    it("doesn't let you compose functions of the wrong types", () => {
        const flow = startWith(3);
        expect(flow.and).type.toBeCallableWith((x: number) => x);
        expect(flow.and).type.not.toBeCallableWith((s: string) => s);
    });

    it("produces a value of the correct type", () => {
        const value = startWith(3).and(String).result();
        expect(value).type.toBe<string>();
    });
});

describe("the Flow interface", () => {
    it("is not user-constructible", () => {
        // Allowing users to create their own Flow subtypes would make any
        // future changes to the Flow interface breaking.
        class MyFlow<T> {
            and<U>(_: (value: T) => U): MyFlow<U> {
                return new MyFlow<U>();
            }
            result(): T {
                return null as T;
            }
        }

        expect(new MyFlow<string>()).type.not.toBeAssignableTo<Flow<string>>();
    });
});
