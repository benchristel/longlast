# [@longlast]

Finally, JavaScript feels like home. (At)longlast is a suite of foundational
TypeScript libraries, inspired by [Ruby], [ActiveSupport], and functional
programming languages like [F#] and [Elixir].

[@longlast]: https://www.npmjs.com/org/longlast
[ActiveSupport]: https://rubygems.org/gems/activesupport
[Elixir]: https://elixir-lang.org/
[F#]: https://fsharp.org/
[Ruby]: https://www.ruby-lang.org/

## Documentation

User documentation is available at [longlast.js.org].

If you're here to browse the source code, it's in [`pkg/`]. Please note that
the source code on `main` is likely to be newer than the packages you have
installed. You might want to check out the release tag for the package and
version you're interested in, e.g. `@longlast/curry@0.2.3`.

[longlast.js.org]: https://longlast.js.org/
[`pkg/`]: https://github.com/benchristel/longlast/tree/main/pkg/

## Development

### Codebase Tour

If you're just getting your bearings, start with [dev/docs/organization.md].

[dev/docs/organization.md]: dev/docs/organization.md

### Styleguide

Before making changes to longlast, please make sure you are familiar with the
latest [styleguide](dev/docs/styleguide.md).

### Setup

Recommended dependency versions:

```
GNU bash  version 5.0.17(1)-release
GNU Make  4.2.1
rsync     3.1.3
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

These tools might be helpful in preparing a release:

```bash
make unreleased  # List packages with unreleased changes
make proof       # Build all packages to proof/, for proofreading
```

### Creating a new package

```sh
make new PACKAGE=my-new-package
```

Running this command will create a new directory in pkg/ with some
TODO comments and type errors for you to fix.

## Acknowledgements

Thank you to [js.org] for providing the [longlast.js.org] domain!

[js.org]: https://js.org/

## TODO

- Copy tstyche.config.json to packages on build, so we have a record of the
  supported TypeScript versions for each release.
- Add a dev script to draw the package dependency graph.
- `utf8Encode`, `utf8Decode`
- `takeFirst(n)`
- `takeLast`
- `dropFirst`
- `dropLast`
- `@longlast/name`
- `@longlast/value`
- `@longlast/format`
- `@longlast/indent`
- `@longlast/dedent`
- `@longlast/expectation-failure`
- `@longlast/test`
- `@longlast/result`
- `@longlast/stacktrace`
- `@longlast/prepend` (elem -> array -> array)
- `@longlast/append` (elem -> array -> array)
- `@longlast/chain-start` (Enumerables)
- `@longlast/chain-end` (Enumerables)
- `@longlast/addPrefix` (strings)
- `@longlast/addSuffix` (strings)
