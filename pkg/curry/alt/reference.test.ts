import {behavesLikeCurry} from "../api/spec.ts";
import {curry} from "./reference.ts";

behavesLikeCurry(curry, "the reference implementation of curry");
