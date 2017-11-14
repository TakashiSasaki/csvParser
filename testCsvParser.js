"use strict";
var fs = require("fs");
var assert = require("assert");
var encoding = require("./encoding.js/encoding.js");
var csvParser = require("./CsvParser.js");

assert.equal(csvParser.comma(","), ",");
assert.equal(csvParser.nonDq("a"), "a");
assert.equal(csvParser.nonDq("1"), "1");
assert.equal(csvParser.nonComma("b"), "b");
assert.equal(csvParser.nonTab("a"), "a");
assert.equal(csvParser.dqField("\"dqField\""), "\"dqField\"");
assert.equal(csvParser.dqField('"dqField"'), '"dqField"');
assert.equal(csvParser.dqInner("abcde1"), "abcde1");
assert.equal(csvParser.tabInner("tabInner"), "tabInner");
assert.equal(csvParser.commaInner("commaInner"), "commaInner");
assert.equal(csvParser.interField(" , "), " , ");
assert.equal(csvParser.interField("\t"), "\t");
assert.equal(csvParser.interField("\t,"), "\t,");
assert.equal(csvParser.csvField('"csvField"'), '"csvField"');
assert.deepEqual(csvParser.csvLine('"hello",1.23,"world"'), 
  ['"hello"', "1.23", '"world"'] );
assert.deepEqual(csvParser.csvDocument('hello,world,"1.234"\na,b,c'),
  [["hello","world", '"1.234"'], ["a", "b", "c"]]);
assert.deepEqual(csvParser.csvDocument('hello,world,1.234\na,b,c'),
  [["hello", "world", "1.234"], ["a","b","c"]]);

assert.equal(csvParser.csvField("\u{29e3d}"), "\u{29e3d}");

fs.readFile("testdata/hello.utf8", "utf8", function(err, text){
  assert.equal(encoding.detect(text), "UNICODE");
  var result = csvParser.csvDocument(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

fs.readFile("testdata/hello.utf8", null, function(err, utf8Text){
  assert.equal(encoding.detect(utf8Text), "UTF8")
  var text = encoding.convert(utf8Text, {to:"UNICODE", from:"UTF8", type:"string"});
  var result = csvParser.csvDocument(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

fs.readFile("testdata/hello.sjis", null, function(err, sjisText){
  assert.equal(encoding.detect(sjisText), "SJIS")
  var text = encoding.convert(sjisText, {to:"UNICODE", from:"SJIS", type:"string"});
  var result = csvParser.csvDocument(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

fs.readFile("testdata/hello.utf16", null, function(err, utf16Text){
  assert.equal(encoding.detect(utf16Text), "UTF16")
  var text = encoding.convert(utf16Text, {to:"UNICODE", from:"UTF16", type:"string"});
  var result = csvParser.csvDocument(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

fs.readFile("pasteFromExcel/tabInCell.tsv", null, function(err, asciiText){
  assert.equal(encoding.detect(asciiText), "ASCII")
  var text = encoding.convert(asciiText, {to:"ASCII", from:"ASCII", type:"string"});
  var result = csvParser.csvDocument(text);
  console.log(result);
});

