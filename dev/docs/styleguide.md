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

Additionally, there will be tests ensuring that each package _really is_
compatible with the full version range it allows for each dependency. E.g. if
package `a` depends on `b@^1.0.0`, and the latest version of `b` is 1.2.0,
tests will ensure that `a` _actually works_ with `b@1.0.0`, not just `b@1.2.0`.

## AI Policy

No generative AI tools will be used in the development of longlast. All
absurdities and goof-ups are 100% my own :)

[Semantic Versioning for TypeScript Types]: https://www.semver-ts.org/
