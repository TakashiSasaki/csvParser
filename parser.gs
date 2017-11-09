function getCsvParser() {
  const asciiNull = Parsimmon.range("\u0000", "\u0000").result("\u0000");
  const delimNull = Parsimmon.range("\u0000", "\u0000").result(0);
  const asciiChar1 = Parsimmon.range("\u0001", "\u0008");
  const asciiTab = Parsimmon.range("\u0009", "\u0009").result("\u0009");
  const delimTab = Parsimmon.range("\u0009", "\u0009").result(9);
  const asciiLf = Parsimmon.range("\u000a", "\u000a").result("\\u000a");
  const delimLf = Parsimmon.range("\u000a", "\u000a").result(11);
  const asciiChar2 = Parsimmon.range("\u000b", "\u000c");
  const asciiCr = Parsimmon.range("\u000d", "\u000d").result("\\u000d");
  const delimCr = Parsimmon.range("\u000d", "\u000d").result(13);
  const asciiChar3 = Parsimmon.range("\u000e", "\u0021");
  const asciiDq = Parsimmon.range("\u0022", "\u0022").result("\\u0022");
  const delimDq = Parsimmon.range("\u0022", "\u0022").result(34);
  const asciiChar4 = Parsimmon.range("\u0023", "\u002b");
  const asciiComma = Parsimmon.range("\u002c", "\u002c").result("\u002c");
  const delimComma = Parsimmon.range("\u002c", "\u002c").result(44);
  const asciiChar5 = Parsimmon.range("\u002d", "\u007f");
  const utf16Char = Parsimmon.range("\u0080", "\udbff");
  
  const nonSpecialChar = asciiChar1.or(asciiChar2).or(asciiChar3).or(asciiChar4).or(asciiChar5).or(utf16Char);
  const nonDq = asciiChar1.or(asciiTab).or(asciiLf).or(asciiChar2).or(asciiCr).or(asciiChar3).or(asciiChar4).or(asciiComma).or(asciiChar5).or(utf16Char);
  const dqdq = asciiDq.times(2).result("\\x22");
  const dqFieldInner = Parsimmon.alt(nonDq, dqdq).many();
  const endOfLine = Parsimmon.alt(delimCr, delimLf).atLeast(1).result(11);
  const endOfField = delimComma.or(endOfLine);
  const dqField = Parsimmon.seq(delimDq, dqFieldInner, delimDq);
  const nqField = asciiChar1.or(asciiTab).or(asciiChar2).or(asciiChar3).or(asciiChar4).or(asciiChar5).or(utf16Char).many();
  const field = Parsimmon.alt(dqField, nqField);
  
  const parser = Parsimmon.seq(Parsimmon.seq(field, endOfField).many(), field);
  return parser;
}

csvParser = undefined;

function parseCsv(string_to_be_parsed) {
  if(csvParser === undefined) {
    csvParser = getCsvParser();
  }
  var result = csvParser.parse(string_to_be_parsed);
  if(result.status == false) throw result; 
  return result.value;
  //Logger.log(result.value);
  //var flatten_string = ListUtility.flattenStringList(result.value);
  //var flatten_list = ListUtility.flattenNestedList(flatten_string);
  //return flatten_list;
}

function test_parseCsv(){
  Logger.log(parseCsv('a,bcd\r\nefg,hij,"klm"'));
  //Logger.log(ListUtility.flattenNestedList(ListUtility.flattenStringList(parseCsv('a,bcd\r\nefg,hij,"klm"'))));
  //Logger.log(parseCsv(''));
  //Logger.log(parseCsv(","));
}
