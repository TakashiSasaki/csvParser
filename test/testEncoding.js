"use strict";
var fs = require("fs");
var assert = require("assert");
var encoding = require("../encoding.js/encoding.js");
var csvParser = require("../CsvParser.js");

fs.readFile("../multibyte/hello.utf8", "utf8", function(err, text){
  assert.equal(encoding.detect(text), "UNICODE");
  assert.equal(encoding.detect(encoding.stringToCode(text)), "UNICODE");
  //assert(encoding.isUNICODE(text));
  var result = csvParser.csvDocument(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

fs.readFile("../multibyte/hello.utf8", null, function(err, utf8Text){
  assert.equal(encoding.detect(utf8Text), "UTF8")
  var text = encoding.convert(utf8Text, {to:"UNICODE", from:"UTF8", type:"string"});
  var result = csvParser.csvDocument(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

fs.readFile("../multibyte/hello.sjis", null, function(err, sjisText){
  assert.equal(encoding.detect(sjisText), "SJIS")
  var text = encoding.convert(sjisText, {to:"UNICODE", from:"SJIS", type:"string"});
  var result = csvParser.csvDocument(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

fs.readFile("../multibyte/hello.utf16", null, function(err, utf16Text){
  assert.equal(encoding.detect(utf16Text), "UTF16")
  var text = encoding.convert(utf16Text, {to:"UNICODE", from:"UTF16", type:"string"});
  var result = csvParser.csvDocument(text);
  assert.deepEqual(result, [ [ '"本日は"', '晴天なり' ], [ '' ] ]);
});

fs.readFile("../pasteFromExcel/tabInCell.tsv", null, function(err, asciiText){
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

fs.readFile("test.tsv", null, function(err, asciiText){
  //assert.equal(encoding.detect(asciiText), "UTF8");
  var text = encoding.convert(asciiText, {to:"UNICODE", from:"UTF8", type:"string"});
  var result = csvParser.tsvDocument(text);
  console.log(result);
});


