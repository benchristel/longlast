// @ts-nocheck
import {$equals} from "@longlast/symbols"

$equals satisfies Symbol

// @ts-expect-error
$equals satisfies string
