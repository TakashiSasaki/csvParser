var parsimmon = require("./parsimmon/src/parsimmon.js")

//characters
var range1 = parsimmon.range("\u0000", "\u0008");
var ht = parsimmon.string("\u0009");
var lf = parsimmon.string("\u000a");
var range2 = parsimmon.range("\u000b", "\u000c");
var cr = parsimmon.string("\u000d");
var range3 = parsimmon.range("\u000e", "\u0021");
var dq = parsimmon.string("\u0022");
var range4 = parsimmon.range("\u0023", "\u002b");
var comma = parsimmon.string("\u002c");
var range5 = parsimmon.range("\u002d", "\ud7ff");
var surrogateHigh = parsimmon.range("\ud800", "\udbff");
var surrogateLow = parsimmon.range("\udc00", "\udfff");
var surrogate = parsimmon.seq(surrogateHigh, surrogateLow).tie();
var range6 = parsimmon.range("\ue000", "\uffff");
var nonSpecial = range1.or(range2).or(range3).or(range4).or(range5).or(range6).or(surrogate);

var nonDq = nonSpecial.or(ht).or(lf).or(cr).or(comma);
var nonTab = nonSpecial.or(comma).or(dq);
var nonComma = nonSpecial.or(ht).or(dq);
var dqdq = parsimmon.seq(dq,dq).tie();

var dqInner = nonDq.or(dqdq).many().tie();
var tabInner = nonTab.many().tie();
var commaInner = nonComma.many().tie();

var dqField = parsimmon.seq(dq, dqInner, dq).tie();

var csvField = dqField.or(commaInner).or(tabInner);

var crlf = parsimmon.seq(cr,lf).tie();
var interLine = crlf.or(lf).or(cr);
var spaces = parsimmon.string(" ").many().tie();
var htcomma = parsimmon.string("\t,");
var commaht = parsimmon.string(",\t");
var spcommasp = parsimmon.seq(spaces, comma, spaces).tie();
var interField = htcomma.or(spcommasp).or(commaht).or(ht);

var leadingCsvField = parsimmon.seqMap(csvField, interField, function(x,y){return x;});
var csvLine = parsimmon.seqMap(leadingCsvField.many(), csvField.atMost(1), function(x,y){return x.concat(y);});

var leadingCsvLine = parsimmon.seqMap(csvLine, interLine, function(x,y){return x;});
var csvDocument = parsimmon.seqMap(leadingCsvLine.many(), csvLine.atMost(1), function(x,y){return x.concat(y);});

console.log(comma.parse(","));
console.log(dqInner.parse("abcde"));
console.log(nonDq.parse("a"));
console.log(nonComma.parse("a"));
console.log(nonTab.parse("a"));
console.log(dqField.parse("\"abcde\""));
console.log(dqField.parse('"abcde"'));
console.log(tabInner.parse("abcde"));
console.log(commaInner.parse("abcdef"));
console.log(interField.parse(" , "));
console.log(interField.parse("\t"));
console.log(interField.parse("\t,"));
console.log(csvField.parse('"hello"'));
console.log(csvLine.parse('"hello",1.23,"world"'));
console.log(csvDocument.parse('hello,world,"1.234"\na,b,c'));
console.log(csvDocument.parse('hello,world,1.234\na,b,c'));

console.log(csvField.parse("\u{29e3d}"));
