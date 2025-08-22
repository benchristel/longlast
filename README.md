# [@longlast]

Finally, JavaScript feels like home. (At)longlast is a suite of foundational
TypeScript libraries, inspired by [Ruby], [ActiveSupport], and functional
programming languages like [F#] and [Elixir].

**This readme is currently aspirational.** There's no actual code here yet :)

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

See [dev/docs/releasing.md](dev/docs/releasing.md).

## TODO

- `@longlast/name`
- `@longlast/value`
- `@longlast/format`
- `@longlast/indent`
- `@longlast/dedent`
- `@longlast/expectation-failure`
- `@longlast/test`
- `@longlast/result`

[@longlast]: https://www.npmjs.com/org/longlast
[ActiveSupport]: https://rubygems.org/gems/activesupport
[Elixir]: https://elixir-lang.org/
[F#]: https://fsharp.org/
[Ruby]: https://www.ruby-lang.org/
[TC39]: https://tc39.es/
