NODE=$(if $(shell which node),node,/drives/p/node-v11.6.0-win-x64/node.exe)
NPM=$(if $(shell which npm),npm,/drives/p/node-v11.6-win-x64/npm.cmd)

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
