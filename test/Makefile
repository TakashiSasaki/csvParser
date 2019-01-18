NODE=$(if $(shell which node),node,/drives/p/node-v11.6.0-win-x64/node.exe)

.PHONY: test
#.DELETE_ON_ERROR:

test: testCsvParser.js testEncoding.js empty.ldjson oneline.ldjson
	date | $(NODE) csv2ldjson.js

%.ldjson: %.csv
	cat "$<" | $(NODE) csv2ldjson.js > "$@"
	diff "$@" "$@.good"

testCsvParser.js:
	$(NODE) testCsvParser.js

testEncoding.js:
	$(NODE) testEncoding.js


