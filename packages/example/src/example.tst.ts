import {expect, test} from "tstyche";

function isSameLength<T extends {length: number}>(a: T, b: T) {
    return a.length === b.length;
}

test("isSameLength", () => {
    expect(isSameLength([1, 2], [1, 2, 3])).type.toBe<boolean>();
    expect(isSameLength("one", "two")).type.toBe<boolean>();

    expect(isSameLength).type.not.toBeCallableWith(1, 2);
});