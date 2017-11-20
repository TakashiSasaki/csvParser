/**
  @param {String} text
  @returns {String[][]}  
*/
function csvDocument(text) {
  Logger.log("requiring CsvParser");
  var CsvParser = require("CsvParser");
  var result = CsvParser.csvDocument(text);
  return result;
}

function testCsvDocument(){
  Logger.log(csvDocument("a,b,c"));
}
