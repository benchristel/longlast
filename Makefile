.DEFAULT_GOAL = right

.PHONY: right
right: fix test ;

.PHONY: verify
verify: test typecheck typetest lint-all sys ;

.PHONY: test
test:
	@dev/scripts/run-unit-tests.ts

.PHONY: ts
ts:
	@pnpm tsc --watch

.PHONY: fix
fix:
	@dev/scripts/changed-files | dev/scripts/prettier --write

.PHONY: fix-all
fix-all:
	@dev/scripts/all_files | dev/scripts/prettier --write

.PHONY: lint
lint:
	@dev/scripts/changed-files | dev/scripts/prettier --check

.PHONY: lint-all
lint-all:
	@dev/scripts/all_files | dev/scripts/prettier --check

.PHONY: typetest
typetest:
	@pnpm tstyche --config dev/config/tstyche.json

.PHONY: typecheck
typecheck:
	@pnpm tsc

.PHONY: sys
sys:
	@dev/scripts/test-packaging

.PHONY: build
build: clean
	@dev/scripts/build

.PHONY: clean
clean:
	@rm -rf pkg/*/dist

.PHONY: deps
deps:
	@pnpm install

.PHONY: docs
docs:
	@pnpm typedoc --options dev/config/typedoc.json --out docs-src/reference
	@pnpm mdsite -i docs-src -t dev/config/docs-template.html

.PHONY: serve
serve:
	@pnpx http-server -c-1 -o docs

.PHONY: unreleased
unreleased:
	@dev/scripts/unreleased

.PHONY: proof
proof: build
	@dev/scripts/proof

.PHONY: release
release:
	@dev/scripts/release

.PHONY: new
new:
	@dev/scripts/new-package $(PACKAGE)
