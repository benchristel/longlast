import {testFunctionCurrying} from "../api/spec.ts";
import {curry} from "./reference.ts";

testFunctionCurrying(curry, "the reference implementation of curry");
