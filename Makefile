.PHONY: test
test:
	@dev/scripts/test.ts

fix:
	@dev/scripts/fix

ts:
	@pnpm tsc --watch --project dev/config/tsconfig.json
