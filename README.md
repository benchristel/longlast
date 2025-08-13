# [@longlast]

Finally, JavaScript feels like home. (At)longlast is a suite of foundational
TypeScript libraries, inspired by [Ruby], [ActiveSupport], and functional
programming languages like [F#] and [Elixir].

**This readme is currently aspirational.** There's no actual code here yet :)

## Motivation

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

## Design

- Each published function or class is distributed as a separate package.
  - **Why?** By keeping the API of each package small, it's easier for
    consumers to know what changed in a given release. There is also less
    chance of packages getting duplicated in a client's bundle due to "diamond
    dependencies" where two packages require different major versions of some
    third package. This is simply the result of fewer major versions being
    released.
- For the convenience of clients who don't want dozens of imports in every file,
  there will be a `@longlast/index` package that aggregates the other packages.
- For convenience and consistency in development, the source code will be
  structured as a pnpm monorepo.

### Naming

Exported names should be unique across all packages, because they will all get
exported from `@longlast/index`.

If a suitable unique name cannot be found, the name should be "namespaced" in
an object.

Types, classes, and "namespace" objects use `PascalCase`.

All other values use `lowerCamelCase`.

The names of symbol values start with a dollar sign, e.g. `$equals`.

Ruby casing conventions are used for initialisms: `toJson`, not `toJSON`,
`HttpClient`, not `HTTPClient`. This allows the casing of names to be
transformed automatically.

### Versioning

Breaking changes are just about the second-worst thing in software engineering
(the worst thing being bugs). That means:

- It's usually not worth changing a published name — even if the name is
  hard to understand or inconsistent with other names.
- It's better to have multiple ways of doing the same thing than one way that's
  constantly changing.
- If the right abstraction is not yet apparent, it's better to make clients
  implement some functionality themselves than to provide an abstraction that
  may prove unsuitable.
- Rather than release a v2 of an existing package, it's better to create a
  completely new "competitor."
  - If nothing else, this simplifies the process of backporting fixes to v1 of
    the package, since the source code is right there on `main`.
  - The new competitor package might fail to outcompete the old one, in which
    case it can simply be abandoned.
- `export * from "file.ts"` is terrible. It obscures what's actually being
  exported and almost inevitably leads to things becoming public that should
  not be.
- If a package can't abide by these guidelines, it should have a major version
  of 0 (semver's way of signaling that breaking changes are expected).

The general principle: packages shouldn't make promises they're not willing to
keep.

Unfortunately, Hyrum's Law means that just about every change will break
_someone_.  While I don't think it's reasonable for package maintainers to
bend over backwards for clients who are doing weird things, it is a good idea
for packages to defend against unreasonable use. That means:

- Clearly distinguishing between types that are user-constructible and those
  that are not (i.e. can only be created via constructor functions published by
  the package).
- Using [brands](https://www.semver-ts.org/3-practical-guidance.html#avoiding-user-constructibility)
  to ensure clients _can't_ construct types they're not supposed to.
- Separating "input" (contravariant) types from "output" (covariant) types.

  <details>
    <summary>Example</summary>

    Suppose we have some code like this:

    ```ts
    export type Person = {name: string};
    export function setName(p: Person, name: string): Person {
        // ...
    }
    ```

    This might seem innocuous, but consider what happens if we add a new
    property to `Person`:

    ```ts
    export type Person = {name: string, dob: Date};
    export function setName(p: Person, name: string): Person {
        // ...
    }
    ```

    Clients who were constructing their own `Person` objects to pass to
    `setName` will now get type errors, because they aren't providing the
    required `dob` property!

    The rule that solves this is to make sure each exported type is either:

    - only used in contravariant positions, like function parameters and
      write-only properties.
    - only used in covariant positions, like function return values and
      read-only properties.
    - not user-constructible.

    Incidentally, the need for "variance hygiene" seems like a strong reason
    to prefer immutability in structurally typed languages.

  </details>

- Making sure methods are non-enumerable.
- Using symbols for "ubiquitous" methods like `equals`, `hashCode`, `copy`. This
  ensures these names won't collide with methods from client code.

I'm interested in [Semantic Versioning for TypeScript Types] and will evaluate
its suitability for longlast.

### Testing

longlast is committed to test-driven development of all features and bugfixes,
including:

- Type tests for public APIs
- Unit tests for behavior
- System tests for packaging and installation

Additionally, there will be tests ensuring that each package _really is_
compatible with the full version range it allows for each dependency. E.g. if
package `a` depends on `b@^1.0.0`, and the latest version of `b` is 1.2.0,
tests will ensure that `a` _actually works_ with `b@1.0.0`, not just `b@1.2.0`.

### Paradigm

longlast aims to relieve the tension between the functional and
object-oriented programming paradigms by enabling a "faux-O" style, as
described by Gary Bernhardt. The idea is that objects are immutable and
record-like, but can also have methods. This style promotes discoverability and
cohesion, while also allowing functional idioms like
`movies.map(prop("title"))`.

### AI Policy

No generative AI tools will be used in the development of longlast. All
absurdities and goof-ups are 100% my own :)

## Development

### Setup

Recommended dependency versions:

```
GNU Make  4.2.1
Node.js   24.5.0
pnpm      10.14.0
```

After installing those, run:

```sh
make deps  # installs dependencies and configures git hooks
```

### Everyday commands

```sh
make           # alias for `make right` (below)
make right     # runs all checks and fixes formatting
make verify    # runs all checks
make test      # runs unit tests
make sys       # runs system tests
make ts        # runs the typechecker in watch mode
make typetest  # runs type-level tests
make lint      # finds problems
make fix       # fixes (some) problems
```

### Releasing

Releasing is a semi-manual process for now. We expect releases to be frequent
and simple (involving only one package at a time).

To do a release, first write an entry in the package's `CHANGELOG.md` file (but
don't commit it). The changelog format is:

```markdown
# @longlast/my-package

## 1.2.3 (2007-08-09)

Release notes go here.

## 1.2.2 (2007-08-08)

Release notes for version 1.2.2...
```

The log is reverse-chronological. Each release has a level-2 heading with
the version number and the date in YYYY-MM-DD format.

Then run:

```sh
make release  # builds packages for release and prints additional instructions
```

This does the following:

- runs all checks
- bumps the version in `package.json`
- commits the changes to `package.json` and `CHANGELOG.md`
- tags the commit
- builds a tarball of the package
- outputs the commands to actually publish the release on GitHub and NPM. You
  must run these commands manually to finish the release.

## TODO

- installer system tests
- fork typescript-formatter and add a config option to insert trailing newlines
  - open a pull request
- dev/checks/ (any executable at the top level fails `make verify` if it exits
  nonzero)
- `@longlast/symbols`
- `@longlast/equals`
- `@longlast/curry`
- `@longlast/name`
- `@longlast/value`
- `@longlast/format`
- `@longlast/indent`
- `@longlast/dedent`
- `@longlast/expectation-failure`
- `@longlast/test`
- `@longlast/result`

[@longlast]: https://www.npmjs.com/org/longlast
["14 competing standards" problem]: https://xkcd.com/927/
[ActiveSupport]: https://rubygems.org/gems/activesupport
[discussion on the "generic comparison" TC39 proposal]: https://github.com/tc39/notes/blob/HEAD/meetings/2020-06/june-4.md#generic-comparison
[Elixir]: https://elixir-lang.org/
[F#]: https://fsharp.org/
[Ruby]: https://www.ruby-lang.org/
[Semantic Versioning for TypeScript Types]: https://www.semver-ts.org/
[TC39]: https://tc39.es/
