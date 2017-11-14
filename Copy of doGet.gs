function doGet() {
  var htmlTemplate = HtmlService.createTemplateFromFile("index");
  var htmlOutput = htmlTemplate.evaluate();
  htmlOutput.setTitle("csvParser");
  return htmlOutput;
}

/**
  @param {String} text
  @returns {String[][]}
  
*/
function csvDocument(text) {
  var csvParser = require("CsvParser");
  var result = csvParser.csvDocument(text);
  return result;
}

function testCsvDocument(){
  Logger.log(csvDocument("a,b,c"));
}


