import {$equals, $boundArguments} from "#@longlast/symbols";

// @ts-expect-error
$equals satisfies string;
$equals satisfies Symbol;

// @ts-expect-error
$boundArguments satisfies string;
$boundArguments satisfies Symbol;
