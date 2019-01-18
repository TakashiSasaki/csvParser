#NODE=$(if $(shell which node),node,/drives/p/node-v11.6.0-win-x64/node.exe)
ifndef NODE
  include ../node.mk
endif

.PHONY: test
.DELETE_ON_ERROR:

test: test.ldjson

%.ldjson.good: %.tsv
	cat "$<" | $(NODE) tsv2ldjson.js > "$@"

%.ldjson: %.tsv
	cat "$<" | $(NODE) tsv2ldjson.js > "$@"
	diff "$@" "$@.good"

