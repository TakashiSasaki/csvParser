"use strict";
var parsimmon = require("./parsimmon/src/parsimmon.js");

var range1        = parsimmon.range("\u0000", "\u0008");
var ht            = parsimmon.string("\u0009");
var lf            = parsimmon.string("\u000a");
var range2        = parsimmon.range("\u000b", "\u000c");
var cr            = parsimmon.string("\u000d");
var range3        = parsimmon.range("\u000e", "\u001f");
var space         = parsimmon.string("\u0020");
var range4        = parsimmon.range("\u0021", "\u0021");
var dq            = parsimmon.string("\u0022");
var range5        = parsimmon.range("\u0023", "\u002b");
var comma         = parsimmon.string("\u002c");
var range6        = parsimmon.range("\u002d", "\ud7ff");
var surrogateHigh = parsimmon.range("\ud800", "\udbff");
var surrogateLow  = parsimmon.range("\udc00", "\udfff");
var surrogate     = parsimmon.seq(surrogateHigh, surrogateLow).tie();
var range7        = parsimmon.range("\ue000", "\uffff");
var nonSpecial    = range1.or(range2).or(range3).or(range4).or(range5).or(range6).or(range7).or(surrogate);

var nonDq      = nonSpecial.or(ht).or(lf).or(cr).or(space).or(comma);
var nonTab     = nonSpecial.or(space).or(comma).or(dq);
var nonComma   = nonSpecial.or(space).or(dq);
var dqdq       = parsimmon.seq(dq,dq).tie();
var crlf       = parsimmon.seq(cr,lf).tie();
var htsps      = ht.or(space).many().tie();

var csvFieldSeparator    = parsimmon.seq(htsps, comma, htsps).tie();
var tsvFieldSeparator    = ht;
var ssvFieldSeparator    = space.or(ht).atLeast(1).tie();
var lineSeparator   = crlf.or(lf).or(cr);

var dqField         = parsimmon.seq(dq, nonDq.or(dqdq).many().tie(), dq).tie();
var csvDqField      = dqField.lookahead(csvFieldSeparator.or(lineSeparator).or(parsimmon.eof));
var tsvDqField      = dqField.lookahead(tsvFieldSeparator.or(lineSeparator).or(parsimmon.eof));
var ssvDqField      = dqField.lookahead(ssvFieldSeparator.or(lineSeparator).or(parsimmon.eof));
var csvField        = csvDqField.or(nonSpecial.or(ht).or(space).or(dq).many().tie())
                      .lookahead(csvFieldSeparator.or(lineSeparator).or(parsimmon.eof));
var tsvField        = tsvDqField.or(nonSpecial.or(space).or(dq).or(comma).many().tie())
                      .lookahead(tsvFieldSeparator.or(lineSeparator).or(parsimmon.eof));
var ssvField        = ssvDqField.or(nonSpecial.or(dq).or(comma).atLeast(1).tie())
                      .lookahead(ssvFieldSeparator.or(lineSeparator).or(parsimmon.eof));

var csvFieldAndSep  = parsimmon.seqMap(csvField, csvFieldSeparator,
                    function(x,y){return x;});
var csvLine         = parsimmon.seqMap(csvFieldAndSep.many(), csvField.atMost(1), 
                    function(x,y){return x.concat(y);});
var csvLineAndSep   = parsimmon.seqMap(csvLine, lineSeparator,
                    function(x,y){return x;});
var csvDocument     = parsimmon.seqMap(csvLineAndSep.many(), csvLine.atMost(1), 
                    function(x,y){return x.concat(y);});

var tsvFieldAndSep  = parsimmon.seqMap(tsvField, tsvFieldSeparator,
                    function(x,y){return x;});
var tsvLine         = parsimmon.seqMap(tsvFieldAndSep.many(), tsvField.atMost(1),
                    function(x,y){return x.concat(y);});
var tsvLineAndSep   = parsimmon.seqMap(tsvLine, lineSeparator,
                    function(x,y){return x;});
var tsvDocument     = parsimmon.seqMap(tsvLineAndSep.many(), tsvLine.atMost(1), 
                    function(x,y){return x.concat(y);});

var ssvFieldAndSep  = parsimmon.seqMap(ssvField, ssvFieldSeparator,
                    function(x,y){return x;});
var ssvLine         = parsimmon.seqMap(ssvFieldSeparator.atMost(1), ssvFieldAndSep.many(), ssvField.atMost(1),
                    function(x,y,z){
                      if(z.length > 0){ 
                        return y.concat(z);
                      } else {
                        return y;
                      }
                    });
var ssvLineAndSep   = parsimmon.seqMap(ssvLine, lineSeparator,
                    function(x,y){return x;}); 
var ssvDocument     = parsimmon.seqMap(ssvLineAndSep.many(), ssvLine.atMost(1),
                    function(x,y){return x.concat(y);});

var encoding = require("./encoding.js/encoding.js");

module.exports = {
  nonSpecial  : function(x){return nonSpecial.parse(x).value;},
  comma       : function(x){return comma.parse(x).value;}, 
  nonDq       : function(x){return nonDq.parse(x).value;},
  //nonComma    : function(x){return nonComma.parse(x).value;},
  nonTab      : function(x){return nonTab.parse(x).value;},
  //insideDqs   : function(x){return insideDqs.parse(x).value;},
  //insideCommas: function(x){return insideCommas.parse(x).value;},
  //insideTabs  : function(x){return insideTabs.parse(x).value;},
  dqField     : function(x){return dqField.parse(x).value;},

  tsvField    : function(x){return tsvField.parse(x).value;},
  tsvFieldSeparator: function(x){return tsvFieldSeparator.parse(x).value;},
  tsvFieldAndSep: function(x){return tsvFieldAndSep.parse(x).value;},
  tsvLine     : function(x){return tsvLine.parse(x).value;},
  tsvLineAndSep: function(x){return tsvLineAndSep.parse(x).value;},
  tsvDocument : function(x){return tsvDocument.parse(x).value;},

  csvField    : function(x){return csvField.parse(x).value;},
  csvFieldSeparator: function(x){return csvFieldSeparator.parse(x).value;},
  csvFieldAndSep: function(x){return csvFieldAndSep.parse(x).value;},
  csvLine     : function(x){return csvLine.parse(x).value;},
  csvLineAndSep: function(x){return csvLineAndSep.parse(x).value;},
  csvDocument : function(x){return csvDocument.parse(x).value;},

  ssvField    : function(x){return ssvField.parse(x).value;},
  ssvFieldSeparator: function(x){return ssvFieldSeparator.parse(x).value;},
  ssvFieldAndSep: function(x){return ssvFieldAndSep.parse(x).value;},
  ssvLine     : function(x){return ssvLine.parse(x).value;},
  ssvDocument : function(x){return ssvDocument.parse(x).value;},

}

function parseCsvText(text){
  return csvDocument.parse(x).value;
}

function parseTsvText(text){
  return tsvDocument.parse(x).value;
}

function parseSsvText(text){
  return ssvDocument.parse(x).value;
}

