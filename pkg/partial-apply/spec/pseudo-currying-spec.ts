import {type partialApply} from "#@longlast/partial-apply";
import {equals, expect} from "@benchristel/taste";

type Spec = Record<string, () => void>;

export function pseudoCurryingSpec(_partialApply: typeof partialApply): Spec {
    function filter<T>(f: (elem: T) => boolean, array: T[]): T[];
    function filter<T>(f: (elem: T) => boolean, _?: never): (array: T[]) => T[];
    function filter(predicate: any, array?: any[]): any {
        if (array == null) {
            return _partialApply(predicate, filter);
        }
        return array.filter(predicate);
    }

    return {
        [`can be used create a "curried" function`]() {
            const isOdd = (x: number) => x % 2 === 1;
            expect(filter(isOdd)([1, 2, 3]), equals, [1, 3]);
        },
    };
}
