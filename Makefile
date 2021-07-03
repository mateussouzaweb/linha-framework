PROOT=$(shell pwd)

build:
	compactor \
		--source $(PROOT)/src/ \
		--destination $(PROOT)/dist/ \
		--bundle "framework/framework.scss:framework/*/*.scss:framework/framework.css" \
		--bundle "framework/framework.ts:framework/*/*.ts:framework/framework.js" \
		--bundle "site/site.scss:site/*/*.scss:site/site.css" \
		--bundle "site/site.ts:site/*/*.ts:site/site.js"

watch:
	compactor \
		--watch \
		--hashed false \
		--source $(PROOT)/src/ \
		--destination $(PROOT)/dist/ \
		--bundle "framework/framework.scss:framework/*/*.scss:framework/framework.css" \
		--bundle "framework/framework.ts:framework/*/*.ts:framework/framework.js" \
		--bundle "site/site.scss:site/*/*.scss:site/site.css" \
		--bundle "site/site.ts:site/*/*.ts:site/site.js"

server:
	statiq --port 5500 --root $(PROOT)/dist/

develop:
	make -j 2 watch server