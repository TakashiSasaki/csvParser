process = require("process");
csvParser = require("../CsvParser.js");

var input = '';
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(chunk) {
  input += chunk;
});
process.stdin.on('end', function() {
  var parsed_array = csvParser.csvTextFile(input);
  var json_string = JSON.stringify(parsed_array);
  console.log(json_string);
});

