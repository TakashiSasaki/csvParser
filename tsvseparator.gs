/**
  @param {String} text
  @returns {String}
*/
function tsvSeparator(text) {
  if(text === undefined) text = "\t";
  
  var x = require("CsvParser");
  var result = x.tsvSeparator(text);
  return result;
}

/**
  @param {String} text
  @returns {String}
*/
function tsvField(text) {
  if(text === undefined) text = "abc";
  var x = require("CsvParser");
  Logger.log(typeof x.tsvField);
  var result = x.tsvField(text);
  Logger.log(result);
  return result;
}
