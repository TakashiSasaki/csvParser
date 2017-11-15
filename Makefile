.PHONY: all test testCsvParser clean

all: test bundle.gs bundle.js.html

test: testCsvParser

testCsvParser:
	node testCsvParser.js

bundle.js.html: bundle.gs
	(echo "<script>"; cat $< ; echo "var CsvParser = require('bundle');</script>") > $@

bundle.gs: ./CsvParser.js
	browserify -r ./CsvParser:bundle -o $@ 

clean:
	rm -f bundle.gs bundle.js.html
