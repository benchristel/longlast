# `@longlast/flow`

Transforms a value by a sequence of functions.

## Install

Choose your favorite package manager:

```bash
npm  add @longlast/flow
pnpm add @longlast/flow
yarn add @longlast/flow
```

## Use

```ts
import {startWith} from "@longlast/flow"

// Function definitions omitted for brevity.

const actors = startWith(movies)
    .and(flatMap(castMembers))
    .and(deduplicate)
    .and(sort(by(get("name"))))
    .result();
```

## Documentation

[Browse the docs on longlast.js.org][docs].

[docs]: https://longlast.js.org/reference/flow/
