import {testFunctionCurrying} from "../api/currying.spec.ts";
import {curry} from "./reference.ts";

const subjectName = "the reference implementation of curry";

testFunctionCurrying(curry, subjectName);
