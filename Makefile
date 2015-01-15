SHELL := /bin/bash
PATH  := node_modules/.bin:make/bin:$(PATH)

.PHONY: build watch

build: build/hsimp.min.js build/hsimp.css
watch: build .watch.ref

.watch.ref: src/hsimp.js src/hsimp.css build/index.html
	touch .watch.ref
	@ chrome-canary-cli reload

build/hsimp.min.js: src/hsimp.js
	browserify -s hsimp src/hsimp.js | uglifyjs -m -c > build/hsimp.min.js

build/hsimp.css: src/hsimp.css
	uglifycss src/hsimp.css > build/hsimp.css
