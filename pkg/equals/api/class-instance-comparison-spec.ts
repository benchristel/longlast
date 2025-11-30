import {expect, is} from "@benchristel/taste";

type EqualsFn = (a: unknown, b: unknown) => boolean;
type Spec = Record<string, () => void>;

export function classInstanceComparisonSpec(_equals: EqualsFn): Spec {
    return {
        "distinguishes different classes"() {
            class ClassOne {}
            class ClassTwo {}
            expect(_equals(ClassOne, ClassTwo), is, false);
        },

        "distinguishes instances of different classes"() {
            class ClassOne {}
            class ClassTwo {}
            expect(_equals(new ClassOne(), new ClassTwo()), is, false);
        },

        "equates instances of the same class with the same properties"() {
            class ClassOne {
                public a: number;
                constructor(a: number) {
                    this.a = a;
                }
            }
            const a = new ClassOne(1);
            const b = new ClassOne(1);
            expect(_equals(a, b), is, true);
        },

        "distinguishes instances of the same class with different properties"() {
            class ClassOne {
                public a: number;
                constructor(a: number) {
                    this.a = a;
                }
            }
            const a = new ClassOne(1);
            const b = new ClassOne(22);
            expect(_equals(a, b), is, false);
        },

        "distinguishes a subclass instance from a superclass instance"() {
            class Superclass {}
            class Subclass extends Superclass {}
            expect(_equals(new Subclass(), new Superclass()), is, false);
            expect(_equals(new Superclass(), new Subclass()), is, false);
        },
    };
}
