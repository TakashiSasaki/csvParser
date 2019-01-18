include node.mk

.PHONY: all test testCsvParser clean multibyte \
	ls-node-win

test: multibyte
	make -C tsv2ldjson 
	make -C test

all: require.gs require.js.html


clean:
	rm -f require.gs require.js.html

require.js.html: require.gs
	(echo "<script>"; cat $< ; echo "var CsvParser = require('CsvParser');</script>") > $@

require.gs: ./CsvParser.js
	browserify -r ./CsvParser:CsvParser -o $@ 

multibyte:
	make -C multibyte

ls-node-win:
	./ver.cmd
	ls -l /drives/
	ls -l /drives/p/
	ls -l /drives/p/Download/
	ls -l /drives/p/node-win-x64/
	ls -l /drives/p/node-win-x64/npm.cmd

npm-init:
	$(NPM) init

npm-install:
	$(NPM) install parsimmon --save-dev 
	$(NPM) install encoding-japanese --save-dev 
	$(NPM) install

npm-link:
	$(NPM) link
