# Motivation

One of [Ruby]'s strengths is its promotion of what I call _ubiquitous
interfaces_. The standard library makes heavy use of common methods like
`.to_s` for converting to a string, `<<` for appending, and `==` for checking
whether two objects are equal. Users of the language are encouraged to
implement these methods on their own classes, which allows them to immediately
integrate with a wide range of standard-library functionality. For example, all
you need to do to create a new collection type in Ruby is implement the `each`
method and `include Enumerable`.

Modern JavaScript programs use patterns that are superficially similar to those
found in Ruby programs: immutable value objects, classes, and functional idioms
like `map` and `filter`. But JavaScript programs are hampered by the absence of
ubiquitous interfaces in the standard library. Without ubiquitous interfaces,
there are certain things you _can't_ do well, and as a result, writing
JavaScript just doesn't feel as nice as writing Ruby.

For example, take the case of a test framework that needs to compare two
objects for equality in assertions: `expect(a).toEqual(b)`. In order for this
to be generally useful, the test framework needs a standard way of
comparing any two objects for equality. Yet no such standard exists in
JavaScript. Test frameworks have worked around this by defining their own
notion of equality that works for most cases. But user-defined types can't
define their own equality semantics unless they know about the test framework,
which leads to problems.

For example, consider the situation where we want to use a curried function
as a lightweight command object, and write tests that compare partially
applied functions by value:

```js
const printCommand = curry(function (message, _thunkDummyArg) {
    console.log(message);
});

function greet(name) {
    return printCommand(`Hello, ${name}!`);
}

test("greet", () => {
    expect(greet("world")).toEqual(printCommand("Hello, world!"));
});
```

This test can't be written in JavaScript, unless one of the following is true:

1. `curry` knows about the test framework
2. the test framework knows about `curry`
3. both know about some third thing: a standard equality operator.
4. the author of `greet` defines their own matcher for the test framework that
   knows about `curry`.

Option 2 is the path I took with my test framework `@benchristel/taste`, while
option 4 is perhaps the most common in JavaScript codebases — though often,
such creature comforts for developers are not implemented at all. Option 3 is
the path chosen by Ruby.

Why can't a standard value-equality operator be implemented in the language
itself? Unfortunately, the path to a built-in generic equality operator in
JavaScript is fraught with peril, due to the language's complex semantics and
the need for consistency with the many existing operators and standard library
methods that rely on a concept of equality. See the [discussion on the "generic
comparison" TC39 proposal] for more info. If built-in types can't sensibly
define equality, it makes little sense to expose a hook like `Symbol.equals`
for user-defined types to implement. Defining equality in a library is the
next-best thing, and much lower-risk than building it into the language.

What about the ["14 competing standards" problem], though? If every library
defines their own "standard" ubiquitous interfaces, that's as bad as having
_no_ standard, or worse.

I think what saves the situation is that **most libraries wouldn't benefit**
from ubiquitous interfaces. A library of string-manipulation functions or
filesystem utilities does not need anything that `@longlast` would provide.
The purpose of `@longlast` is to make _application_ code easier to write — e.g.
by making it easier to write and use domain types and functions.

Using `@longlast` for a JavaScript project is therefore a bit like using Rails
or ActiveSupport in a Ruby project. It might dramatically change how you write
code, but it doesn't interfere with your use of other libraries.

["14 competing standards" problem]: https://xkcd.com/927/
[discussion on the "generic comparison" TC39 proposal]: https://github.com/tc39/notes/blob/HEAD/meetings/2020-06/june-4.md#generic-comparison
[Ruby]: https://www.ruby-lang.org/
