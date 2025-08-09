.DEFAULT_GOAL = right

.PHONY: right
right: fix verify ;

.PHONY: verify
verify: test typecheck typetest lint sys ;

.PHONY: test
test:
	@dev/scripts/test.ts

.PHONY: ts
ts:
	@pnpm tsc --watch --project dev/config/tsconfig.json

.PHONY: fix
fix:
	@dev/scripts/format --replace

.PHONY: lint
lint:
	@dev/scripts/format --verify

.PHONY: typetest
typetest:
	@pnpm tstyche --config dev/config/tstyche.json

.PHONY: typecheck
typecheck:
	@pnpm tsc --project dev/config/tsconfig.json

.PHONY: sys
sys:
	@echo "No system tests to run."

.PHONY: deps
deps:
	@pnpm install
