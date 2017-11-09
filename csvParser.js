"use strict";
var parsimmon = require("./parsimmon/src/parsimmon.js")

function CsvParser() {
	//characters
	this.range1 = parsimmon.range("\u0000", "\u0008");
	this.ht = parsimmon.string("\u0009");
	this.lf = parsimmon.string("\u000a");
	this.range2 = parsimmon.range("\u000b", "\u000c");
	this.cr = parsimmon.string("\u000d");
	this.range3 = parsimmon.range("\u000e", "\u0021");
	this.dq = parsimmon.string("\u0022");
	this.range4 = parsimmon.range("\u0023", "\u002b");
	this.comma = parsimmon.string("\u002c");
	this.range5 = parsimmon.range("\u002d", "\ud7ff");
	this.surrogateHigh = parsimmon.range("\ud800", "\udbff");
	this.surrogateLow = parsimmon.range("\udc00", "\udfff");
	this.surrogate = parsimmon.seq(this.surrogateHigh, this.surrogateLow).tie();
	this.range6 = parsimmon.range("\ue000", "\uffff");
	this.nonSpecial = this.range1.or(this.range2).or(this.range3).
        or(this.range4).or(this.range5).or(this.range6).or(this.surrogate);

	this.nonDq = this.nonSpecial.or(this.ht).or(this.lf).or(this.cr).or(this.comma);
	this.nonTab = this.nonSpecial.or(this.comma).or(this.dq);
	this.nonComma = this.nonSpecial.or(this.ht).or(this.dq);
	this.dqdq = parsimmon.seq(this.dq,this.dq).tie();

	this.dqInner = this.nonDq.or(this.dqdq).many().tie();
	this.tabInner = this.nonTab.many().tie();
	this.commaInner = this.nonComma.many().tie();

	this.dqField = parsimmon.seq(this.dq, this.dqInner, this.dq).tie();

	this.csvField = this.dqField.or(this.commaInner).or(this.tabInner);

	this.crlf = parsimmon.seq(this.cr,this.lf).tie();
	this.interLine = this.crlf.or(this.lf).or(this.cr);
	this.spaces = parsimmon.string(" ").many().tie();
	this.htcomma = parsimmon.string("\t,");
	this.commaht = parsimmon.string(",\t");
	this.spcommasp = parsimmon.seq(this.spaces, this.comma, this.spaces).tie();
	this.interField = this.htcomma.or(this.spcommasp).or(this.commaht).or(this.ht);

	this.leadingCsvField = parsimmon.seqMap(this.csvField, this.interField, 
		function(x,y){return x;});
	this.csvLine = parsimmon.seqMap(this.leadingCsvField.many(), this.csvField.atMost(1), 
		function(x,y){return x.concat(y);});

	this.leadingCsvLine = parsimmon.seqMap(this.csvLine, this.interLine, 
    function(x,y){return x;});
	this.csvDocument = parsimmon.seqMap(this.leadingCsvLine.many(), this.csvLine.atMost(1), 
		function(x,y){return x.concat(y);});
}


CsvParser.prototype.parse = function(csvDocument){
	return this.csvDocument.parse(csvDocument);
}

function testCsvParser(){
  var csvParser = new CsvParser();
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

