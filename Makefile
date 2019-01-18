NODEDIR=/drives/p/node-win-x64
NODE=$(if $(shell which node),node,$(NODEDIR)/node.exe)
NPM=$(if $(shell which npm),npm,$(NODEDIR)/npm.cmd)

.PHONY: all test testCsvParser clean multibyte \
	ls-node-win

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

npm-link:
	$(NPM) link
