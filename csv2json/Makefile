ifndef NODE
  include ../node.mk
endif

.PHONY: test
.DELETE_ON_ERROR:

test: empty.json oneline.json twolines.json

%.json.good: %.csv
	cat "$<" | $(NODE) csv2json.js > "$@"

%.json: %.csv
	cat "$<" | $(NODE) csv2json.js > "$@"
	diff "$@" "$@.good"

