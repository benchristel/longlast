import {test} from "@benchristel/taste";
import {reverseCompositionSpec} from "../spec/test.ts";
import {pipe} from "./index.ts";

test("pipe", reverseCompositionSpec(pipe));
