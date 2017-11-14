.PHONY: all test testCsvParser clean

all: test bundle.gs bundle.js.html

test: testCsvParser

testCsvParser:
	node testCsvParser.js

bundle.js.html: bundle.gs
	(echo "<script>"; cat $< ; echo "</script>") > $@

bundle.gs: 
	browserify -r ./CsvParser:CsvParser -o $@ 

clean:
	rm -f bundle.gs bundle.js.html
