// Ensure FunctionProvenance can be imported.
import {type FunctionProvenance} from "#@longlast/function-provenance";

// We need to use FunctionProvenance to prevent a TypeScript error about unused
// imports.
({}) as any as FunctionProvenance;
