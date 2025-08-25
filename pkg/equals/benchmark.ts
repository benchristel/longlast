#!/usr/bin/env node
import {createBenchmark} from "../../dev/scripts/create-benchmark.ts";
import {equals as publishedEquals} from "#@longlast/equals";

const data1 = createData();
const data2 = createData();

createBenchmark()
    .add("published", () => publishedEquals(data1, data2))
    // JSON-stringifying the data and comparing strings isn't even correct, but
    // since it's an approach someone might reach for to solve a particular
    // instance of the general problem, it's worth comparing it to our `equals`
    // function.
    .add("json", () => JSON.stringify(data1) === JSON.stringify(data2))
    .run();

function createData(n = 0): unknown[] {
    return [
        new Array(100).fill("someString" + n),
        Object.fromEntries(
            new Array(100)
                .fill(null)
                .map((_, i) => ["someString" + i + n, "someOtherString" + n]),
        ),
    ];
}
