# Currying Functions

_Currying_ is the act of transforming a function that takes multiple arguments
into a function that takes those arguments one at a time, in a sequence of
calls.

For example, suppose we have a `countLetters` function defined like so:

```ts
function countLetters(letter: string, word: string): number {
    let count = 0;
    for (const character of word) {
        if (character === letter) {
            count++;
        }
    }
    return count;
}

countLetters("r", "strawberry"); // => 3
```

We can create a curried version using Longlast's `curry` function:

```ts
import {curry} from "@longlast/curry";

const count = curry(countLetters);

// count can still be called normally...
count("r", "strawberry"); // => 3

// ...and, because it's curried, it can also be given its arguments one by one.
count("s")("Mississippi"); // => 4
```

When only one argument is passed to a curried function, the result is a new
curried function that takes the remaining arguments. A function that has been
given only some of its arguments is called _partially applied_. The reason we
like currying is that partially applied functions are often useful in their own
right.

For example:

```ts
const countRs = count("r");

const words = ["strawberry", "archaeopteryx", "Ferarri", "lozenge"]

words.map(countRs); // => [3, 2, 3, 0]
```

As you can see, by defining a curried `count` function, we get a whole
bunch of others for almost free: `countAs`, `countBs`, etc.

There's usually no need to give a name to these partially applied functions,
though, as they're plenty readable when created at the point of use:

```ts
words.map(count("r"));
```

Without `curry`, we'd have to write:

```ts
words.map((word) => countLetters("r", word))
```

All that extra syntax just gets in the way. The `word` variable name is not
helpful, since we already know we're dealing with words. Curried functions, by
contrast, let us distill the program to its essence.

## Performance

Some readers might be concerned about the performance of the preceding
examples. What kind of performance penalty does `curry` impose?

I'm happy to report that the answer is "almost none" in the most common cases
(curried functions of 2 and 3 arguments). You can use `@longlast/curry` with a
clear conscience.

Note that most other `curry` packages available on NPM are considerably less
performant. You can download the Longlast source code and run the benchmarks to
see this for yourself. Here are the results on my machine:

```
inline function | #################################### . 7,110,624 ops/sec ±0.43%
@longlast/curry | ################################# . 6,628,769 ops/sec ±0.57%
ramda           | # . 204,623 ops/sec ±0.49%
lodash          | # . 170,245 ops/sec ±0.26%
```

## `@longlast/partial-apply`

As cool as `curry` is, it has some limitations when it comes to TypeScript
types. One limitation is that the types for `curry` only support functions
of 5 arguments or fewer. I don't expect this to pose a problem for most users;
well-designed functions rarely exceed 3 or perhaps 4 arguments. Still, if you
find you need a curried function with 6 or more arguments, please open an
issue; I'd be happy to add support for it.

A more serious limitation of `curry` is that it can't handle functions with
type parameters. So if we have a function like this:

```ts
function filter<T>(f: (element: T) => boolean, array: T[]): T[] {
    return array.filter(f);
}
```

...and we try to call `curry(filter)`, we'll get a type error because of the
`<T>` type parameter.

The workaround is to use the `partialApply` function from
`@longlast/partial-apply`. This lets us create curried functions with type
parameters, at the cost of some additional typing:

```ts
import {partialApply} from "@longlast/partial-apply";

function filter<T>(f: (element: T) => boolean, array: T[]): T[];
function filter<T>(f: (element: T) => boolean, _?: never): (array: T[]) => T[];
function filter(f: any, array?: any): any {
    if (array == null) {
        return partialApply(f, filter);
    }
    return array.filter(f);
}
```
