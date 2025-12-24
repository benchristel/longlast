# `@longlast/send`

Sends a message to an object, invoking a method.

## Install

Choose your favorite package manager:

```bash
npm  add @longlast/send
pnpm add @longlast/send
yarn add @longlast/send
```

## Use

```ts
import {send} from "@longlast/send";
import {startWith} from "@longlast/flow";

class Person {
    constructor(private name: string) {}

    getName(): string {
        return this.name;
    }
}

startWith(new Person("Elias"))
    .and(send("getName"))
    .result(); // => "Elias"
```

## Documentation

[Browse the docs on longlast.js.org][docs].

[docs]: https://longlast.js.org/reference/send/
