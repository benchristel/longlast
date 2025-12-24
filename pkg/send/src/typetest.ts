import {send} from "./index.ts";
import {describe, it, expect} from "tstyche";

describe("send", () => {
    class Greeter {
        greet() {
            return "hi";
        }
    }

    class ByNameGreeter {
        greet(name: string) {
            return `Hello, ${name}!`;
        }
    }

    class IdentityTransformer {
        transform<T>(value: T): T {
            return value;
        }
    }

    it("sends a message to an object", () => {
        const result = send("greet")(new Greeter());
        expect(result).type.toBe<string>();
    });

    it("forbids use if required arguments are not passed", () => {
        const sendGreetWithNoArguments = send("greet");
        expect(sendGreetWithNoArguments).type.toBeCallableWith(new Greeter());
        expect(sendGreetWithNoArguments).type.not.toBeCallableWith(
            new ByNameGreeter(),
        );
    });

    it("forbids use if arguments have the wrong type", () => {
        const sendGreetWithNumber = send("greet", 1);
        expect(sendGreetWithNumber).type.not.toBeCallableWith(
            new ByNameGreeter(),
        );
    });

    it("returns unknown when the method has a type parameter", () => {
        // Characterization test: this behavior is subject to change. In the
        // future, we might be able to infer a more specific type.
        expect(
            send("transform", 1)(new IdentityTransformer()),
        ).type.toBe<unknown>();
    });
});
