NODE=$(if $(shell which node),node,/drives/p/node-v11.6.0-win-x64/node.exe)

.PHONY: test testCsvParser.js testEncoding.js

test: testCsvParser.js testEncoding.js

testCsvParser.js:
	$(NODE) testCsvParser.js

testEncoding.js:
	$(NODE) testEncoding.js


