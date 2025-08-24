#!/usr/bin/env node
import Benchmark from "benchmark";
import {curry} from "#@longlast/curry";

function noVarargsCurry(f: any): any {
    return (a: any, b: any) => {
        if (arguments.length < 2) {
            return (b: any) => f(a, b);
        }
        return f(a, b);
    };
}

const data = new Array(100).fill(0);
const add = (a: number, b: number) => a + b;
const addCurry = curry(add);
const addNoVarargsCurry = noVarargsCurry(add);

const suite = new Benchmark.Suite()
    .add("reference", () => data.map(addCurry(1)))
    .add("no varargs", () => data.map(addNoVarargsCurry(1)))
    .add("inline", () => data.map((x) => x + 1))
    .on("cycle", (event: any) => console.log(String(event.target)))
    .on("complete", () =>
        console.log(
            "Fastest: " + suite.filter("fastest").map("name").join(", "),
        ),
    );

suite.run();
