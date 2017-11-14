var encoding = require("./encoding.js/encoding.js");

function detectEncoding(x){
  var detectedEncoding = encoding.detect(x);
  return detectedEncoding;
}

