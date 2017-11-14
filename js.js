var encoding = require("./encoding.js/encoding.js");
window.detectEncoding = function(x){
  return encoding.detect(x);
}

