.PHONY: all test testCsvParser clean

all: test CsvParser.gs CsvParser.html

test: testCsvParser

testCsvParser:
	node testCsvParser.js

CsvParser.html: ./CsvParser.gs
	(echo "<script>"; cat CsvParser.gs ; echo "</script>") > $@

CsvParser.gs: ./CsvParser.js
	browserify -r ./$<:CsvParser -o $@ 

clean:
	rm -f CsvParser.gs CsvParser.html 
