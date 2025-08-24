# [@longlast]

Finally, JavaScript feels like home. (At)longlast is a suite of foundational
TypeScript libraries, inspired by [Ruby], [ActiveSupport], and functional
programming languages like [F#] and [Elixir].

[@longlast]: https://www.npmjs.com/org/longlast
[ActiveSupport]: https://rubygems.org/gems/activesupport
[Elixir]: https://elixir-lang.org/
[F#]: https://fsharp.org/
[Ruby]: https://www.ruby-lang.org/

## File organization

This section explains where to find things in the longlast repository. It's
intended for developers of longlast and people who want to browse the code.

- The code for each package in the `@longlast` namespace lives in `pkg/*`. So
  e.g. `pkg/equals/` houses the code for `@longlast/equals`. Within each
  package's directory, the following structure is observed:

  - `api/` contains executable specifications (i.e. tests) for the package's
    behavior and types.
  - `package-tests/` contains smoketests to verify that the build process
    creates a valid NPM package.
  - `src/` contains the source (TypeScript) code, and unit tests for
    functionality that is not part of the stable API.
  - `alt/` contains alternative implementations of the package, for use in
    performance benchmarks. Typically, this includes a slow but simple
    "reference" implementation.
  - `benchmark.ts` runs the benchmarks.
  - `CHANGELOG.md` documents each release.
  - `tsconfig.build.json` says how to compile the source code to JavaScript.
  - `package.json` defines the package's name and version, its dependencies,
    and the locations of its exported files.

- Package-agnostic development tools live in `dev/`:
  - `dev/config/` contains configuration for the formatter, compiler, test
    frameworks, etc.
  - `dev/consistency-tests/` contains tests that sanity-check each package's
    file structure and configuration.
  - `dev/docs/` contains developer-facing documentation.
  - `dev/scripts/` contains programs that aid development. Most of these are
    meant to be invoked via `make` (see the list of [everyday commands] below);
    the rest (e.g. `clone-worktree`) are "subroutines" called by other scripts.

[everyday commands]: #everyday-commands

## Development

### Styleguide

Before making changes to longlast, please make sure you are familiar with the
latest [styleguide](dev/docs/styleguide.md).

### Setup

Recommended dependency versions:

```
GNU bash  version 5.0.17(1)-release
GNU Make  4.2.1
Node.js   24.5.0
pnpm      10.14.0
```

Other versions might work too, but I have not tested with them.

After installing the aforementioned dependencies, run:

```sh
make deps  # installs Node.js packages and configures git hooks
```

### Everyday commands

```sh
make           # alias for `make right` (below)
make right     # runs unit tests and fixes formatting
make verify    # runs all checks
make test      # runs unit tests
make sys       # runs system tests
make ts        # runs the typechecker in watch mode
make typetest  # runs type-level tests
make lint      # finds problems
make fix       # fixes (some) problems
```

### Performance benchmarks

To run the perf benchmarks for a particular package:

```sh
make -C pkg/my-package perf
```

Note that not all packages have benchmarks.

### Releasing

See [dev/docs/releasing.md](dev/docs/releasing.md).

## TODO

- Copy tstyche.config.json to packages on build, so we have a record of the
  supported TypeScript versions for each release.
- `@longlast/name`
- `@longlast/value`
- `@longlast/format`
- `@longlast/indent`
- `@longlast/dedent`
- `@longlast/expectation-failure`
- `@longlast/test`
- `@longlast/result`
