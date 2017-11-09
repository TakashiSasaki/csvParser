'use strict';

var fs = require("fs");
if(process.argv.length !== 4) {
  process.stderr.write("node readFile.js <inputFileName> <inputEncoding>\n");
  return -1;
}
var inputFileName = process.argv[2];
var inputEncoding = process.argv[3];

if(!inputEncoding) {
  inputEncoding = "utf8";  
}

fs.readFile(inputFileName,inputEncoding ,function(err, text){
  console.log(text);
});

