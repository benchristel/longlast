#!/usr/bin/env node
import {createBenchmark} from "../../dev/scripts/create-benchmark.ts";
import {curry as publishedCurry} from "#@longlast/curry";
// @ts-expect-error - mu-lambda has no type declarations.
import {curry as muLambdaCurry} from "mu-lambda";
import {curry as ramdaCurry} from "ramda";
import {default as lodashCurry} from "lodash/fp/curry.js";

const data = new Array(100).fill(0);
const add = (a: number, b: number) => a + b;
const addWithPublishedCurry = publishedCurry(add);
const addWithMuLambdaCurry = muLambdaCurry(add);
const addWithRamdaCurry = ramdaCurry(add);
const addWithLodashCurry = lodashCurry(add);

createBenchmark()
    .add("published", () => data.map(addWithPublishedCurry(1)))
    .add("mu-lambda", () => data.map(addWithMuLambdaCurry(1)))
    .add("ramda", () => data.map(addWithRamdaCurry(1)))
    .add("lodash", () => data.map(addWithLodashCurry(1)))
    .add("inline", () => data.map((x) => x + 1))
    .run();
