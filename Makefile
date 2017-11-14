.PHONY: all test testCsvParser

all: test CsvParser.gs js.html

test: testCsvParser

testCsvParser:
	node testCsvParser.js

js.html: js.js
	(echo "<script>"; browserify $< ; echo "</script>") > $@

CsvParser.gs: ./CsvParser.js
	browserify -r ./CsvParser.js -o $@ 


