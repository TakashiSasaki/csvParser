.PHONY: all test testCsvParser clean multibyte

all: require.gs require.js.html

test: multibyte
	make -C test

clean:
	rm -f require.gs require.js.html

require.js.html: require.gs
	(echo "<script>"; cat $< ; echo "var CsvParser = require('CsvParser');</script>") > $@

require.gs: ./CsvParser.js
	browserify -r ./CsvParser:CsvParser -o $@ 

multibyte:
	make -C multibyte


