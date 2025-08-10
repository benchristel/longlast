.DEFAULT_GOAL = right

.PHONY: right
right: fix verify ;

.PHONY: verify
verify: test typecheck typetest lint-all sys ;

.PHONY: test
test:
	@dev/scripts/test.ts

.PHONY: ts
ts:
	@pnpm tsc --watch

.PHONY: fix
fix:
	@dev/scripts/changed_files | dev/scripts/tsfmt --replace
	@dev/scripts/changed_files | dev/scripts/jsonprettier --write

.PHONY: fix-all
fix-all:
	@dev/scripts/all_files | dev/scripts/tsfmt --replace
	@dev/scripts/all_files | dev/scripts/jsonprettier --write

.PHONY: lint
lint:
	@dev/scripts/changed_files | dev/scripts/tsfmt --verify
	@dev/scripts/changed_files | dev/scripts/jsonprettier --check

.PHONY: lint-all
lint-all:
	@dev/scripts/all_files | dev/scripts/tsfmt --verify
	@dev/scripts/all_files | dev/scripts/jsonprettier --check

.PHONY: typetest
typetest:
	@pnpm tstyche --config dev/config/tstyche.json

.PHONY: typecheck
typecheck:
	@pnpm tsc

.PHONY: sys
sys:
	@echo "No system tests to run."

.PHONY: build
build: clean
	@dev/scripts/build

.PHONY: clean
clean:
	@rm -rf packages/*/dist

.PHONY: deps
deps:
	@pnpm install
