.PHONY: test
test:
	@dev/scripts/test.ts

.PHONY: fix
fix:
	@dev/scripts/fix

.PHONY: ts
ts:
	@pnpm tsc --watch --project dev/config/tsconfig.json
