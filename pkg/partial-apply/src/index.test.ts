import {test} from "@benchristel/taste";
import {partialApplicationSpec} from "../spec/partial-application-spec.ts";
import {partialApply} from "./index.ts";

test("partialApply", partialApplicationSpec(partialApply));
