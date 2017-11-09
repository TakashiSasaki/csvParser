"use strict";
var fs = require("fs");
var assert = require("assert");
var csvParser = require("./CsvParser.js");

assert.equal(csvParser.comma.parse(",").value, ",");
assert.equal(csvParser.nonDq.parse("a").value, "a");
assert.equal(csvParser.nonDq.parse("1").value, "1");
assert.equal(csvParser.nonComma.parse("b").value, "b");
assert.equal(csvParser.nonTab.parse("a").value, "a");
assert.equal(csvParser.dqField.parse("\"dqField\"").value, "\"dqField\"");
assert.equal(csvParser.dqField.parse('"dqField"').value, '"dqField"');
assert.equal(csvParser.dqInner.parse("abcde1").value, "abcde1");
assert.equal(csvParser.tabInner.parse("tabInner").value, "tabInner");
assert.equal(csvParser.commaInner.parse("commaInner").value, "commaInner");
assert.equal(csvParser.interField.parse(" , ").value, " , ");
assert.equal(csvParser.interField.parse("\t").value, "\t");
assert.equal(csvParser.interField.parse("\t,").value, "\t,");
assert.equal(csvParser.csvField.parse('"csvField"').value, '"csvField"');
assert.deepEqual(csvParser.csvLine.parse('"hello",1.23,"world"').value, 
  ['"hello"', "1.23", '"world"'] );
assert.deepEqual(csvParser.parseCsv('hello,world,"1.234"\na,b,c'),
  [["hello","world", '"1.234"'], ["a", "b", "c"]]);
assert.deepEqual(csvParser.parseCsv('hello,world,1.234\na,b,c'),
  [["hello", "world", "1.234"], ["a","b","c"]]);

assert.equal(csvParser.csvField.parse("\u{29e3d}").value, "\u{29e3d}");

fs.readFile("testdata/hello.utf8", "utf8", function(err, text){
  var result = csvParser.parseCsv(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

