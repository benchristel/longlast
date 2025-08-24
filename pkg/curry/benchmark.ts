#!/usr/bin/env node
import Benchmark from "benchmark";
import {curry as referenceCurry} from "./alt/reference.ts";
import {curry as publishedCurry} from "#@longlast/curry";

const data = new Array(100).fill(0);
const add = (a: number, b: number) => a + b;
const addWithPublishedCurry = publishedCurry(add);
const addWithReferenceCurry = referenceCurry(add);

const suite = new Benchmark.Suite()
    .add("published", () => data.map(addWithPublishedCurry(1)))
    .add("reference", () => data.map(addWithReferenceCurry(1)))
    .add("inline", () => data.map((x) => x + 1))
    .on("cycle", (event: any) => console.log(String(event.target)))
    .on("complete", () =>
        console.log(
            "Fastest: " + suite.filter("fastest").map("name").join(", "),
        ),
    );

suite.run();
