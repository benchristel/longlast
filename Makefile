.DEFAULT_GOAL = right

.PHONY: right
right: fix verify ;

.PHONY: verify
verify: test typecheck ;

.PHONY: test
test:
	@dev/scripts/test.ts

.PHONY: fix
fix:
	@dev/scripts/fix

.PHONY: ts
ts:
	@pnpm tsc --watch --project dev/config/tsconfig.json

.PHONY: typecheck
typecheck:
	@pnpm tsc --project dev/config/tsconfig.json
