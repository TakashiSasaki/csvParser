.PHONY: all test testCsvParser clean gas

all: require.gs require.js.html

test:
	(node testCsvParser.js; node testEncoding.js)

clean:
	rm -f require.gs require.js.html

require.js.html: require.gs
	(echo "<script>"; cat $< ; echo "var CsvParser = require('CsvParser');</script>") > $@

require.gs: ./CsvParser.js
	browserify -r ./CsvParser:CsvParser -o $@ 

