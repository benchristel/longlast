import {$equals} from "#@longlast/symbols";

// @ts-expect-error
$equals satisfies string;
$equals satisfies Symbol;
