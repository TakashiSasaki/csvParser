#NODE=$(if $(shell which node),node,/drives/p/node-v11.6.0-win-x64/node.exe)
ifndef NODE
  include ../node.mk
endif

.PHONY: test
.DELETE_ON_ERROR:

test: empty.json oneline.json test.json

%.json.good: %.tsv
	cat "$<" | $(NODE) tsv2ldjson.js > "$@"

%.json: %.tsv
	cat "$<" | $(NODE) tsv2json.js > "$@"
	diff "$@" "$@.good"

