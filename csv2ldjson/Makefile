ifndef NODE
  include ../node.mk
  #NODE=$(if $(shell which node),node,/drives/p/node-v11.6.0-win-x64/node.exe)
endif

.PHONY: test
.DELETE_ON_ERROR:

test: empty.ldjson oneline.ldjson twolines.ldjson

%.ldjson.good: %.csv
	cat "$<" | $(NODE) csv2ldjson.js > "$@"

%.ldjson: %.csv
	cat "$<" | $(NODE) csv2ldjson.js > "$@"
	diff "$@" "$@.good"


