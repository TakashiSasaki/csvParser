.PHONY: all test testCsvParser

all: test

test: testCsvParser

testCsvParser:
	node testCsvParser.js

