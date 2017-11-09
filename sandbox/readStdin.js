'use strict';

var fs = require("fs");
if(process.argv.length !== 3) {
  process.stderr.write("node readStdin.js <inputEncoding>\n");
  return -1;
}
var inputEncoding = process.argv[2];

if(!inputEncoding) {
  inputEncoding = "utf8";  
}

fs.readFile("/dev/stdin",inputEncoding ,function(err, text){
  console.log(text);
});

