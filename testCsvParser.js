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
assert.equal(csvParser.insideDqs("abcde1"), "abcde1");
assert.equal(csvParser.insideTabs("insideTabs"), "insideTabs");
assert.equal(csvParser.insideCommas("insideCommas"), "insideCommas");
assert.equal(csvParser.csvSeparator(" , "), " , ");
assert.equal(csvParser.csvSeparator("\t,"), "\t,");
assert.equal(csvParser.tsvSeparator("\t"), "\t");
assert.equal(csvParser.tsvField('"tsvField"'), '"tsvField"');
assert.equal(csvParser.tsvField('tsvField'), 'tsvField');
assert.equal(csvParser.tsvField('"tsv\nField"'), '"tsv\nField"');
assert.equal(csvParser.tsvField('"tsv\tField"'), '"tsv\tField"');
assert.equal(csvParser.tsvFieldAndSep("abc\t"), "abc");
assert.equal(csvParser.tsvFieldAndSep("abc\t"), "abc");
assert.equal(csvParser.tsvFieldAndSep('"abc\t"\t'), '"abc\t"');
assert.deepEqual(csvParser.tsvLine('"hello"\t1.23\t"world"'), 
  ['"hello"', "1.23", '"world"'] );
assert.equal(csvParser.csvField('"csvField"'), '"csvField"');
assert.equal(csvParser.csvField('1.23'), '1.23');
assert.equal(csvParser.csvField('1.23,"hello"'), undefined);
assert.equal(csvParser.csvFieldAndSep('"csvField" , '), '"csvField"');
assert.equal(csvParser.csvFieldAndSep('1.23,'), '1.23');
assert.equal(csvParser.csvFieldAndSep('1.23,"world"'), undefined);
assert.deepEqual(csvParser.csvLine('"hello",1.23,"world"'), 
  ['"hello"', "1.23", '"world"'] );
assert.deepEqual(csvParser.csvLine('1.23,"world"'), 
  ["1.23", '"world"'] );
assert.deepEqual(csvParser.tsvLine('1.23\t"world"'), 
  ["1.23", '"world"'] );
assert.deepEqual(csvParser.csvLineAndSep('1.23,"world"\n'), 
  ["1.23", '"world"'] );
assert.deepEqual(csvParser.csvLineAndSep('"hello",1.23,"world"\n'), 
  ['"hello"', "1.23", '"world"'] );
assert.deepEqual(csvParser.tsvLineAndSep('"hello"\t1.23\t"world"\n'), 
  ['"hello"', "1.23", '"world"'] );
assert.deepEqual(csvParser.tsvLineAndSep('"hello"\t1.23\t"world"\r'), 
  ['"hello"', "1.23", '"world"'] );
assert.deepEqual(csvParser.csvDocument('hello,world,"1.234"\na,b,c'),
  [["hello","world", '"1.234"'], ["a", "b", "c"]]);
assert.deepEqual(csvParser.csvDocument('hello,world,1.234\na,b,c'),
  [["hello", "world", "1.234"], ["a","b","c"]]);

assert.equal(csvParser.csvField("\u{29e3d}"), "\u{29e3d}");

fs.readFile("multibyte/hello.utf8", "utf8", function(err, text){
  assert.equal(encoding.detect(text), "UNICODE");
  var result = csvParser.csvDocument(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

fs.readFile("multibyte/hello.utf8", null, function(err, utf8Text){
  assert.equal(encoding.detect(utf8Text), "UTF8")
  var text = encoding.convert(utf8Text, {to:"UNICODE", from:"UTF8", type:"string"});
  var result = csvParser.csvDocument(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

fs.readFile("multibyte/hello.sjis", null, function(err, sjisText){
  assert.equal(encoding.detect(sjisText), "SJIS")
  var text = encoding.convert(sjisText, {to:"UNICODE", from:"SJIS", type:"string"});
  var result = csvParser.csvDocument(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

fs.readFile("multibyte/hello.utf16", null, function(err, utf16Text){
  assert.equal(encoding.detect(utf16Text), "UTF16")
  var text = encoding.convert(utf16Text, {to:"UNICODE", from:"UTF16", type:"string"});
  var result = csvParser.csvDocument(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

fs.readFile("pasteFromExcel/tabInCell.tsv", null, function(err, asciiText){
  assert.equal(encoding.detect(asciiText), "ASCII")
  var text = encoding.convert(asciiText, {to:"ASCII", from:"ASCII", type:"string"});
  var result = csvParser.tsvDocument(text);
  assert.deepEqual(result, [ [ 'a', 'b', 'c' ],
  [ '"a\na"', '"b\nb"', '"c\nc"' ],
  [ '"a\ta"', '"b\tb"', '"c\tc"' ],
  [ '"a\ta"', '"b\tb"', '"c\tc"' ],
  [ '3', '3', '3' ],
  [ "" ]]);
});

fs.readFile("kenqweb.txt", null, function(err, asciiText){
  //assert.equal(encoding.detect(asciiText), "UTF8");
  var text = encoding.convert(asciiText, {to:"UNICODE", from:"UTF8", type:"string"});
  var result = csvParser.tsvDocument(text);
  console.log(result);
});


