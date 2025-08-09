.DEFAULT_GOAL = right

.PHONY: right
right: fix verify ;

.PHONY: verify
verify: test typecheck typetest lint sys ;

.PHONY: test
test:
	@dev/scripts/test.ts

.PHONY: typetest
typetest:
	@pnpm tstyche

.PHONY: fix
fix:
	@dev/scripts/format --replace

.PHONY: lint
lint:
	@dev/scripts/format --verify

.PHONY: ts
ts:
	@pnpm tsc --watch --project dev/config/tsconfig.json

.PHONY: typecheck
typecheck:
	@pnpm tsc --project dev/config/tsconfig.json

.PHONY: sys
sys:
	@echo "No system tests to run."