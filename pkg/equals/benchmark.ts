#!/usr/bin/env node
import {createBenchmark} from "../../dev/scripts/create-benchmark.ts";
import {equals as longlastEquals} from "#@longlast/equals";
import fastDeepEqual from "fast-deep-equal/es6/index.js";

{
    const obj1 = {};
    const obj2 = {};

    createBenchmark("empty objects")
        .add("@longlast/equals", () => longlastEquals(obj1, obj2))
        .add("fast-deep-equal", () => fastDeepEqual(obj1, obj2))
        // JSON-stringifying the data and comparing strings isn't even correct,
        // but since it's an approach someone might reach for to solve a
        // particular instance of the general problem, it's worth comparing it
        // to our `equals` function.
        .add("json", () => JSON.stringify(obj1) === JSON.stringify(obj2))
        .run();
}
