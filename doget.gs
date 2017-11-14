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
  var bundle = require("bundle");
  var result = bundle.csvDocument(text);
  return result;
}

function testCsvDocument(){
  Logger.log(csvDocument("a,b,c"));
}


