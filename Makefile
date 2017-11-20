.PHONY: all test testCsvParser clean

all: CsvParser.gs CsvParser.js.html

test:
	node testCsvParser.js

clean:
	rm -f CsvParser.gs CsvParser.js.html

CsvParser.js.html: CsvParser.gs
	(echo "<script>"; cat $< ; echo "var CsvParser = require('CsvParser');</script>") > $@

CsvParser.gs: ./CsvParser.js
	browserify -r ./CsvParser:CsvParser -o $@ 

