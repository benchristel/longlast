import {testFunctionCurrying} from "../api/currying.spec.ts";
import {curry} from "./reference.ts";

testFunctionCurrying(curry, "the reference implementation of curry");
