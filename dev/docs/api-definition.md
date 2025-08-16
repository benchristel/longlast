# API Definition

Packages in `@longlast` adhere to [Semantic Versioning], and guarantee
backward-compatibility of API changes in non-major releases. In order for this
guarantee to be well-defined, we have to define what the API of `@longlast`
actually is. This is harder than it might at first appear.

[Semantic Versioning]: https://semver.org/

In this document, we'll use the term *stable* to denote properties of
packages that are guaranteed not to change in non-major releases.

## Explicitly unstable packages and properties

Certain attributes of a package or API mark it explicitly as _unstable_:

- A major version of 0 (as defined by [semver])
- A version that includes a prerelease or build suffix, like `1.0.0-beta.4` or
  `1.0.0+1295`
- A note in the documentation stating that a feature is unstable.

[semver]: https://semver.org/

## Documented behavior

Unless explicitly declared to be unstable, documented behavior of longlast
packages is stable. That is, non-major releases will not change behavior in a
way that requires documentation to change. Undocumented behavior may or may not
be stable.

## API tests

The stable API of each package is formally defined by tests and typetests in
the `src/api` directory. A feature is stable to the extent that changing it
would cause a test failure in `src/api`. API tests are "append-only" — they are
not removed or meaningfully changed in non-major releases.

## TypeScript Support Policy

The TypeScript compiler can make breaking changes in any release. Because of
this, longlast can't promise to support old TypeScript versions indefinitely.

The TypeScript support policy is TBD.

## Stable and unstable properties of types

In practice, users of a library rely on its types for autocomplete support.
That means that, to a first approximation, all exported types need to be
stable. However, it's tricky to define exactly what "stable" means in a
structural type system like TypeScript.

This section provides practical guidelines for using longlast's types in a way
that's forward-compatible with changes to stable APIs.

### Don't use `typeof` on longlast types

Using `typeof` on symbols exported from longlast is not supported. To see why,
consider the following example:

```ts
// Bad code! Don't follow this example!
// typeof frotz is (a: string) => number
import {frotz} from "@longlast/frotz"

type VacuumCleaner = {
    operate: typeof frotz
}

const vac: VacuumCleaner = {
    operate(a: string): number {
        return 0
    },
}
```

If `@longlast/frotz` makes _any_ change to the type of the `frotz` function,
the code above will fail to typecheck, because the `VacuumCleaner` type will
change and the value of `vac` will no longer be assignable to it.

This is why, as "Semantic Versioning for TypeScript Types" states,

> Using the type-level typeof operator to construct a type using the type of an
> exported item from a library wholly defeats the ability of authors to specify
> a public API.
>
> —[semver-ts.org](https://www.semver-ts.org/formal-spec/1-definitions.html)

You may safely use types that are exported from `longlast` with their own
names. These types are stable unless the documentation indicates otherwise. The
following code is fine:

```ts
// FrotzFunction is (a: string) => number
import {type FrotzFunction} from "@longlast/frotz"

type VacuumCleaner = {
    operate: FrotzFunction
}

const vac: VacuumCleaner = {
    operate(a: string): number {
        return 0
    },
}
```

### Don't pull types apart

TypeScript has a bunch of "[utility types]" that pull out bits and pieces of
another type or transform the type in some way:

- `Awaited<Type>`
- `Partial<Type>`
- `Required<Type>`
- `Readonly<Type>`
- `Pick<Type, Keys>`
- `Omit<Type, Keys>`
- `Exclude<UnionType, ExcludedMembers>`
- `Extract<Type, Union>`
- `NonNullable<Type, Union>`
- `Parameters<Type>`
- `ConstructorParameters<Type>`
- `ReturnType<Type>`
- `InstanceType<Type>`
- `ThisParameterType<Type>`
- `OmitThisParameter<Type>`
- `ThisType<Type>`

**Don't use these utilities on longlast types.** If you do, typechecking is
likely to fail when you update longlast.

Note that this list might not be exhaustive — TypeScript might add more utility
types in the future.

The following utility types are safe to use with longlast types:

- `Record<Keys, Type>`

[utility types]: https://www.typescriptlang.org/docs/handbook/utility-types.html

### Don't assign values from longlast to mutable bindings without an explicit type declaration

Mutable bindings include `var` and `let` statements, and class properties that
are not `readonly`.
