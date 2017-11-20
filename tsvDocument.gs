/**
  @param {String} text
  @returns {String[][]}  
*/
function tsvDocument(text) {
  if(text === undefined) text = "a\t\tb\tc";
  
  Logger.log("start requiring CsvParser");
  var x = require("CsvParser");
  Logger.log(typeof x);
  Logger.log("end requiring CsvParser");
  //var result = x.tsvDocument(text);
  //return result;
}
