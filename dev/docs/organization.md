# File Organization

This document explains where to find things in the longlast repository. It's
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
    meant to be invoked via `make` (see the list of [everyday commands] in the
    main README); the rest (e.g. `clone-worktree`) are "subroutines" called by
    other scripts.

[everyday commands]: ../../README.md#everyday-commands
