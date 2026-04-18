import {describe, it, expect} from "tstyche";
import {
    success,
    failure,
    type Result,
    type Failure,
    assertSuccess,
    assertFailure,
    mapSuccess,
    mapFailure,
    flatMapSuccess,
    flatMapFailure,
} from "./index.ts";

describe("a success", () => {
    it("has an immutable value", () => {
        expect(success(1).value).type.toBe<number>();
        // @ts-expect-error Cannot assign to 'value' because it is a read-only property.
        success(1).value = 2;
    });

    it("is a type of Result", () => {
        expect(success(1)).type.toBeAssignableTo<Result<number, string>>();
    });
});

describe("a failure", () => {
    it("has an immutable detail", () => {
        expect(failure(1).detail).type.toBe<number>();
        // @ts-expect-error Cannot assign to 'detail' because it is a read-only property.
        failure(1).detail = 2;
    });

    it("is a type of Result", () => {
        expect(failure(1)).type.toBeAssignableTo<Result<string, number>>();
    });

    it("returns itself on mapSuccess", () => {
        // Note: the type of the callback function doesn't matter, since it
        // won't be called.
        const mapped = failure(1).mapSuccess((_: string): boolean => false);
        expect(mapped).type.toBe<Failure<number>>();
    });
});

describe("Result#type", () => {
    it("supports type narrowing in switch statements", () => {
        const result = summon<Result<"ok", "err">>();
        switch (result.type) {
            case "success":
                expect(result.value).type.toBe<"ok">();
                break;
            case "failure":
                expect(result.detail).type.toBe<"err">();
                break;
        }
    });
});

describe("Result#isSuccess", () => {
    it("narrows the type of result", () => {
        const result = summon<Result<string, number>>();
        if (result.isSuccess()) {
            expect(result.value).type.toBe<string>();
        }
        if (!result.isSuccess()) {
            expect(result.detail).type.toBe<number>();
        }
    });
});

describe("Result#isFailure", () => {
    it("narrows the type of result", () => {
        const result = summon<Result<string, number>>();
        if (result.isFailure()) {
            expect(result.detail).type.toBe<number>();
        }
        if (!result.isFailure()) {
            expect(result.value).type.toBe<string>();
        }
    });
});

describe("assertSuccess", () => {
    it("narrows the type of result", () => {
        const result = summon<Result<string, number>>();
        assertSuccess(result);
        expect(result.value).type.toBe<string>();
    });
});

describe("assertFailure", () => {
    it("narrows the type of result", () => {
        const result = summon<Result<string, number>>();
        assertFailure(result);
        expect(result.detail).type.toBe<number>();
    });
});

describe("Result#flatMapSuccess", () => {
    it("chains result-returning operations", () => {
        const resultOfString = summon<Result<string, number>>();

        expect(
            resultOfString.flatMapSuccess((s) => indexOf("a", s)),
        ).type.toBeAssignableTo<Result<number, number | null>>();
    });
});

describe("functional mapSuccess", () => {
    it("late-binds the failure detail type", () => {
        const incrementResult = mapSuccess(increment);

        const incremented = incrementResult(indexOf("a", "b"));

        expect(incremented).type.toBe<Result<number, null>>();
    });
});

describe("functional mapFailure", () => {
    it("late-binds the success value type", () => {
        const toNotFound = mapFailure(() => "not found");

        const indexResult = toNotFound(indexOf("a", "b"));

        expect(indexResult).type.toBe<Result<number, string>>();
    });
});

describe("functional flatMapSuccess", () => {
    it("late-binds the failure detail type", () => {
        const result = flatMapSuccess(divide(3))(indexOf("a", "b"));

        expect(result).type.toBe<Result<number, "division by zero" | null>>();
    });
});

describe("functional flatMapFailure", () => {
    it("late-binds the success value type", () => {
        function recoverNotFound(detail: ReadError) {
            if (detail === "does not exist") {
                return success(Buffer.from(""));
            }
            return failure(detail);
        }

        const result = flatMapFailure(recoverNotFound)(readSync("/tmp/f"));

        expect(result).type.toBe<
            Result<
                Buffer<ArrayBuffer>,
                "is a directory" | "insufficient permissions"
            >
        >();
    });
});

declare function increment(n: number): number;

declare function indexOf(
    needle: string,
    haystack: string,
): Result<number, null>;

type ReadError =
    | "does not exist"
    | "is a directory"
    | "insufficient permissions";

declare function readSync(path: string): Result<Buffer<ArrayBuffer>, ReadError>;

declare function divide(
    dividend: number,
): (divisor: number) => Result<number, "division by zero">;

declare function summon<T>(): T;
