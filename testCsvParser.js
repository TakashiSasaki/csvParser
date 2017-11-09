"use strict";
var CsvParser = require("./csvParser.js");
console.log(typeof CsvParser.CsvParser);

function testCsvParser(){
  var csvParser = new CsvParser.CsvParser();
	console.log(csvParser.comma.parse(","));
	console.log(csvParser.dqInner.parse("abcde"));
	console.log(csvParser.nonDq.parse("a"));
	console.log(csvParser.nonComma.parse("a"));
	console.log(csvParser.nonTab.parse("a"));
	console.log(csvParser.dqField.parse("\"abcde\""));
	console.log(csvParser.dqField.parse('"abcde"'));
	console.log(csvParser.tabInner.parse("abcde"));
	console.log(csvParser.commaInner.parse("abcdef"));
	console.log(csvParser.interField.parse(" , "));
	console.log(csvParser.interField.parse("\t"));
	console.log(csvParser.interField.parse("\t,"));
	console.log(csvParser.csvField.parse('"hello"'));
	console.log(csvParser.csvLine.parse('"hello",1.23,"world"'));
	console.log(csvParser.parse('hello,world,"1.234"\na,b,c'));
	console.log(csvParser.parse('hello,world,1.234\na,b,c'));

	console.log(csvParser.csvField.parse("\u{29e3d}"));
}

testCsvParser();

