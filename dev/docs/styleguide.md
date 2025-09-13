# Styleguide

## Exports

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

## Naming

### Uniqueness

Exported names should be unique across all packages, because they will all get
exported from `@longlast/index`.

If a suitable unique name cannot be found, the name should be "namespaced" in
an object.

### Casing

Types, classes, and "namespace" objects use `PascalCase`.

All other values use `lowerCamelCase`.

The names of symbol values start with a dollar sign, e.g. `$equals`.

Ruby casing conventions are used for initialisms: `toJson`, not `toJSON`,
`HttpClient`, not `HTTPClient`. This allows the casing of names to be
transformed automatically.

### Blog post style

Function names and signatures should be such that you could use the function
in a code example in a blog post, and people would understand it without
further explanation.

This implies that functions should not have "extra" parameters tangential to
their central purpose. They _especially_ should not have boolean flags, unless
those are part of a parameter object.

This constraint harmonizes nicely with currying. Curried functions should have
few parameters, and can't have optional parameters.

### "With" options

Sometimes, though, you want a function to be configurable. In that case, a
library can provide two versions of the function:

- a configurable version
- a "default" convenience wrapper

The configurable function's name should end in `With`, and the configuration
argument should come first.

For example:

```ts
equals(a, b)
equalsWith({customCompare}, a, b)
expect(actual, predicate)
expectWith({formatter}, actual, predicate)
```

## Versioning

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

## Testing

longlast is committed to test-driven development of all features and bugfixes,
including:

- Type tests for public APIs
- Unit tests for behavior
- System tests for packaging and installation

## Dependencies between packages

longlast packages may depend on each other. Rather than use pnpm's `catalog:`
protocol, however, we depend only on published package versions and install
them from NPM. This has multiple benefits:

- It ensures we do not accidentally release a package that depends on
  unpublished code.
- It enables us to be deliberate about upgrading the dependencies of each
  package. For example, if `@longlast/equals@1.2.1` can work with
  `@longlast/curry` versions as far back as `1.3.0`, it should specify `^1.3.0`
  as the version range for that dependency; there is no reason for it to
  require a later version like `^1.5.0`. Demanding package versions newer than
  what's actually needed limits interoperability, and might cause packages to
  be duplicated in clients' bundles if the client explicitly requires an older
  version of the package in their own code. (Note that as of this writing, all
  the package versions mentioned in this paragraph are fictitious.)

This approach does come with a cost, however: we can't test that a new package
version will integrate with its client packages until we actually release it.
This cost can be reduced by:

- Clearly defining the API of each package and the requirements for each new
  feature. Those requirements can be converted into unit tests.
- Cutting prerelease versions of a package before doing the actual release.
- Building the initial version of a new package inside a client package. This
  way the API of the package is sure to support at least one use case well.

## AI Policy

No generative AI tools will be used in the development of longlast. All
absurdities and goof-ups are 100% my own :)

[Semantic Versioning for TypeScript Types]: https://www.semver-ts.org/
