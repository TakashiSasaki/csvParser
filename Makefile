.PHONY: all test testCsvParser

all: test

test: testCsvParser

testCsvParser:
	node testCsvParser.js

js.html: js.js
	(echo "<script>"; browserify js.js; echo "</script>") > $@



