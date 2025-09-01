import {test, expect} from "tstyche";
import {$boundArguments, $equals, $unapplied} from "#@longlast/symbols";

test("$equals is a unique symbol", () => {
    expect($equals).type.toBeAssignableTo<Symbol>();
    expect($equals).type.not.toBeAssignableWith<Symbol>();
});

test("$boundArguments is a unique symbol", () => {
    expect($boundArguments).type.toBeAssignableTo<Symbol>();
    expect($boundArguments).type.not.toBeAssignableWith<Symbol>();
});

test("$unapplied is a unique symbol", () => {
    expect($unapplied).type.toBeAssignableTo<Symbol>();
    expect($unapplied).type.not.toBeAssignableWith<Symbol>();
});
