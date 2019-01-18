#NODE=$(if $(shell which node),node,/drives/p/node-win-x64/node.exe)
ifndef NODE
 $(error NODE should be set to an executable binary file of node.js)
endif

.PHONY: test testCsvParser.js testEncoding.js

#.DELETE_ON_ERROR:

test: testCsvParser.js testEncoding.js

testCsvParser.js:
	$(NODE) testCsvParser.js

testEncoding.js:
	$(NODE) testEncoding.js


