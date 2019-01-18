include node.mk

.PHONY: all test testCsvParser clean \
	ls-node-win npm-init npm-install npm-link

test: 
	make -C multibyte
	make -C test
	make -C tsv2ldjson 
	make -C tsv2json 
	make -C csv2ldjson 
	make -C csv2json 

node_modules/: npm-install

all: require.gs require.js.html

clean:
	rm -f require.gs require.js.html

require.js.html: require.gs
	(echo "<script>"; cat $< ; echo "var CsvParser = require('CsvParser');</script>") > $@

require.gs: ./CsvParser.js
	browserify -r ./CsvParser:CsvParser -o $@ 

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
