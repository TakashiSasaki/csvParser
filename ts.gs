
/**
  @param {String} text
  @returns {String[][]}
*/
function tsvSeparator(text) {
  if(text === undefined) text = "\t";
  
  var x = require("CsvParser");
  var result = x.tsvSeparator(text);
  return result;
}
