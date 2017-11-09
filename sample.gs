function sample1() {
  //this code comes from http://panda-noir.hatenablog.jp/entry/2016/04/02/190000
  //const Parsimmon = require('parsimmon');
  const regex = Parsimmon.regex;
  const lazy = Parsimmon.lazy;
  
  const or = regex(/\sor\s/i).result('or');
  const and = regex(/(?:\s|\sand\s)/i).result('and');
  const not = regex(/\s-(?:\w+)/i).map(function(s){return s.slice(1);});
  const parser = or.or(not).or(and).or(regex(/[a-z]+/i)).many();
  
  var result = parser.parse('apple or orange or banana yellow').value;// ->['apple','or','orange','or','banana','and','yellow'];  
  Logger.log(result);
}

function sample2(){
  const regex = Parsimmon.regex;
  const lazy = Parsimmon.lazy;

  const lparen = string('(');
  const rparen = string(')');
  
  const or = regex(/\sor\s/i).result('or');
  const and = regex(/(?:\sand\s|\s)/i).result('and');
  const not = regex(/\s-(?:\w+)/i).map(function(s){return s.slice(1);});
  const parser = lazy(function(){return alt(paren, or, not, and, regex(/[a-z]+/i)).many();});
  const paren = lparen.then(parser).skip(rparen);
  
  var result = parser.parse('apple or orange or banana yellow').value;// ->['apple','or','orange','or','banana','and','yellow'];
  Logger.log(result);
}

function sample3(){
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
  const delimDq = Parsimmon.range("\u0022", "\u0022").result(22);
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

  Logger.log(nonSpecialChar.many().parse("aaaあ"));
  Logger.log(nonDq.many().parse("abc"));
  Logger.log(dqdq.parse('""'));
  Logger.log(endOfLine.parse('\r\r\n\n\r\n'));
  Logger.log(endOfField.many().parse(',,\r,,\n,\r,,'));
  Logger.log(dqField.parse('"a\r\n"""'));
  Logger.log(dqField.parse('"a\r\n""xyz"'));
  Logger.log(Parsimmon.seq(dqField, endOfLine).parse('"a"\r\r\r\r'));
  Logger.log(Parsimmon.seq(dqField, endOfLine.many()).parse('"a"\r\r\r\r'));
  Logger.log(Parsimmon.seq(dqField, endOfLine).many().parse('"a"\r\r\r\r'));
  Logger.log(Parsimmon.seq(dqField, Parsimmon.eof).parse('"a"'));
  Logger.log(Parsimmon.seq(dqField, endOfLine.or(Parsimmon.eof)).parse('"a"\r\r\r'));
  Logger.log(Parsimmon.seq(Parsimmon.seq(dqField, endOfField).many(), dqField).parse('"a"'));
  Logger.log(Parsimmon.seq(dqField, endOfField).parse('"a",'));
  Logger.log(Parsimmon.seq(Parsimmon.seq(dqField, endOfField).many(), dqField).parse('"a","b"'));
  Logger.log(nqField.parse('abc'));
  Logger.log(Parsimmon.seq(nqField, endOfLine).parse('abc\r'));
  Logger.log(Parsimmon.seq(nqField, endOfField).parse('abc\r'));
  Logger.log(Parsimmon.seq(Parsimmon.seq(nqField, endOfField).many(), nqField).parse('abc,def,ghi,123,456,789'));
  Logger.log(Parsimmon.seq(nqField, endOfField).parse('abc,'));
  Logger.log(Parsimmon.seq(nqField, endOfField, nqField).parse('abc,xyz'));
  Logger.log(Parsimmon.seq(nqField, endOfField, nqField).parse('abc,xyz'));
  Logger.log(Parsimmon.seq(Parsimmon.seq(nqField, endOfField).many(), nqField).parse('abc,xyz'));
  Logger.log(Parsimmon.seq(Parsimmon.seq(nqField, delimComma).many(), nqField).parse('abcd,wxyz,'));
  Logger.log(Parsimmon.seq(Parsimmon.seq(nqField, endOfField).many(), nqField).parse('abcd,wxyz,'));
  Logger.log(Parsimmon.seq(Parsimmon.seq(field, endOfField).many(), field).parse('abcd,"wxyz"'));
}
