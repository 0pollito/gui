var fs = require('fs');
var request = require('request');

var image = {};

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

image.send = function(){
  var base64str = base64_encode('resources/vista.jpg');

  var url = 'https://api/image'+base64str;

  // send image to api server 
  request.post({url: url},function(error,response,body) {
    if(error){
      console.log("error :: "+ error);
    }
    console.log(body);
  });
}

module.exports = image;



