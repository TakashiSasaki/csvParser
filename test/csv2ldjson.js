process = require("process");
csvParser = require("../CsvParser.js");

var input = '';
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(chunk) {
  input += chunk;
});
process.stdin.on('end', function() {
  console.log(csvParser.csvDocument(input));
});

