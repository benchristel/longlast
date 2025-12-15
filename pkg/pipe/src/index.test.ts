import {test} from "@benchristel/taste";
import {reverseCompositionSpec} from "../spec/reverse-composition-spec.ts";
import {provenanceSpec} from "../spec/provenance-spec.ts";
import {pipe} from "./index.ts";

test("pipe", reverseCompositionSpec(pipe));
test("pipe", provenanceSpec(pipe));
