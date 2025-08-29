import {$equals, $name} from "#@longlast/symbols";

// @ts-expect-error
$equals satisfies string;
$equals satisfies Symbol;

// @ts-expect-error
$name satisfies string;
$name satisfies Symbol;
