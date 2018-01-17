"use strict";
var assert = require("assert");
var csvParser = require("./CsvParser.js");

console.log("testing charset definition");
assert.equal(csvParser.comma(","), ",");
assert.equal(csvParser.nonDq("a"), "a");
assert.equal(csvParser.nonDq("1"), "1");
assert.equal(csvParser.nonTab("a"), "a");
assert.equal(csvParser.dqField("\"dqField\""), "\"dqField\"");
assert.equal(csvParser.dqField('"dqField"'), '"dqField"');

console.log("testing tsvFieldSeparator");
assert.equal(csvParser.tsvFieldSeparator("\t"), "\t");

console.log("testing tsvField");
assert.equal(csvParser.tsvField('"tsvField"'), '"tsvField"');
assert.equal(csvParser.tsvField('tsvField'), 'tsvField');
assert.equal(csvParser.tsvField('"tsv\nField"'), '"tsv\nField"');
assert.equal(csvParser.tsvField('"tsv\tField"'), '"tsv\tField"');
assert.equal(csvParser.tsvField("\"abc\",123"), "\"abc\",123");

console.log("testing tsvFieldAndSep");
assert.equal(csvParser.tsvFieldAndSep("abc\t"), "abc");
assert.equal(csvParser.tsvFieldAndSep("abc\t"), "abc");
assert.equal(csvParser.tsvFieldAndSep('"abc\t"\t'), '"abc\t"');

console.log("testing tsvLine");
assert.deepEqual(csvParser.tsvLine('"hello"\t1.23\t"world"'), 
  ['"hello"', "1.23", '"world"'] );

console.log("testing tsvDocument");
assert.deepEqual(csvParser.tsvDocument("a\t\tb\tc"), [["a","","b","c"]] );

console.log("testing csvField");
assert.equal(csvParser.csvField('"csvField"'), '"csvField"');
assert.equal(csvParser.csvField('1.23'), '1.23');
assert.equal(csvParser.csvField('1.23,"hello"'), undefined);
assert.equal(csvParser.csvField("\u{29e3d}"), "\u{29e3d}");

console.log("testing csvFieldSeparator");
assert.equal(csvParser.csvFieldSeparator(" , "), " , ");
assert.equal(csvParser.csvFieldSeparator("\t,"), "\t,");

console.log("testing csvFieldAndSep");
assert.equal(csvParser.csvFieldAndSep('"csvField" , '), '"csvField"');
assert.equal(csvParser.csvFieldAndSep('1.23,'), '1.23');
assert.equal(csvParser.csvFieldAndSep('1.23,"world"'), undefined);

console.log("testing csvLine");
assert.deepEqual(csvParser.csvLine('"hello",1.23,"world"'), 
  ['"hello"', "1.23", '"world"'] );
assert.deepEqual(csvParser.csvLine('1.23,"world"'), 
  ["1.23", '"world"'] );
assert.deepEqual(csvParser.tsvLine('1.23\t"world"'), 
  ["1.23", '"world"'] );

console.log("testing csvLineAndSep");
assert.deepEqual(csvParser.csvLineAndSep('1.23,"world"\n'), 
  ["1.23", '"world"'] );
assert.deepEqual(csvParser.csvLineAndSep('"hello",1.23,"world"\n'), 
  ['"hello"', "1.23", '"world"'] );
assert.deepEqual(csvParser.tsvLineAndSep('"hello"\t1.23\t"world"\n'), 
  ['"hello"', "1.23", '"world"'] );
assert.deepEqual(csvParser.tsvLineAndSep('"hello"\t1.23\t"world"\r'), 
  ['"hello"', "1.23", '"world"'] );

console.log("testing csvDocument");
assert.deepEqual(csvParser.csvDocument('hello,world,"1.234"\na,b,c'),
  [["hello","world", '"1.234"'], ["a", "b", "c"]]);
assert.deepEqual(csvParser.csvDocument('hello,world,1.234\na,b,c'),
  [["hello", "world", "1.234"], ["a","b","c"]]);


console.log("testing ssvSeparator");
assert.equal(csvParser.ssvFieldSeparator("   "),"   ");

console.log("testing ssvField");
assert.equal(csvParser.ssvField("ab\"cde"), "ab\"cde");

console.log("testing ssvFieldAndSep");
assert.equal(csvParser.ssvFieldAndSep("abcde "), "abcde");
assert.equal(csvParser.ssvFieldAndSep("abcde \t "), "abcde");

console.log("testing ssvLine");
assert.deepEqual(csvParser.ssvLine("abcde"), ["abcde"]);
assert.deepEqual(csvParser.ssvLine("ab cd ef"), ["ab", "cd", "ef"]);
assert.deepEqual(csvParser.ssvLine("ab\"cde    fgh  "), ["ab\"cde", "fgh"]);

console.log("testing ssvDocument");
assert.deepEqual(csvParser.ssvDocument("ab cd\nef gh"), [["ab","cd"],["ef","gh"]]);

