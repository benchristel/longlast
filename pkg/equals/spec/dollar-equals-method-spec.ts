import {expect, is} from "@benchristel/taste";
import {type equals} from "#@longlast/equals";
import {$equals} from "@longlast/symbols";

type Spec = Record<string, () => void>;

export function dollarEqualsMethodSpec(_equals: typeof equals): Spec {
    return {
        "equates `a` and `b` if `a[$equals](b)` returns true"() {
            class CustomValue {
                property?: string;
                [$equals](_: unknown): boolean {
                    return true;
                }
            }

            const a = new CustomValue();
            a.property = "a";
            const b = new CustomValue();
            b.property = "b";

            expect(_equals(a, b), is, true);
        },

        "distinguishes `a` and `b` if `a[$equals](b)` doesn't return true"() {
            class CustomValue {
                [$equals](_: unknown) {}
            }

            const a = new CustomValue();
            const b = new CustomValue();

            expect(_equals(a, b), is, false);
        },

        "uses $equals in preference to the default Error comparison"() {
            class HttpError extends Error {
                private statusCode: number;
                constructor(message: string, statusCode: number) {
                    super(message);
                    this.statusCode = statusCode;
                }

                [$equals](other: unknown) {
                    return (
                        other instanceof HttpError &&
                        other.statusCode === this.statusCode &&
                        other.message === this.message
                    );
                }
            }

            const a = new HttpError("", 404);
            const b = new HttpError("", 500);
            expect(_equals(a, b), is, false);
        },

        "uses $equals in preference to Object.is() comparison"() {
            function aNumberGreaterThan(threshold: number): unknown {
                return {
                    [$equals](other: unknown) {
                        return typeof other === "number" && other > threshold;
                    },
                };
            }
            const aPositive = aNumberGreaterThan(0);
            expect(_equals(aPositive, 1), is, true);
            expect(_equals(aPositive, 0), is, false);
            expect(_equals(aPositive, aPositive), is, false);
        },
    };
}
