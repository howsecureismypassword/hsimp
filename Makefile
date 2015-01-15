SHELL := /bin/bash
PATH  := node_modules/.bin:make/bin:$(PATH)

.PHONY: build watch

build: hsimp.min.js
watch: hsimp.concat.js

hsimp.min.js: hsimp.js
	browserify -s hsimp hsimp.js | uglifyjs -m -c > hsimp.min.js

hsimp.concat.js: hsimp.js
	browserify -s hsimp hsimp.js > hsimp.concat.js
	@ chrome-canary-cli reload
