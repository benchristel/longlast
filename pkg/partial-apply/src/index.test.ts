import {test} from "@benchristel/taste";
import {partialApplicationSpec} from "../spec/partial-application-spec.ts";
import {partialApply} from "./index.ts";
import {provenanceSpec} from "../spec/provenance-spec.ts";

test("partialApply", partialApplicationSpec(partialApply));
test("partialApply", provenanceSpec(partialApply));
