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

image.sendImage = function(){
  return new Promise(function(fullfill,reject){
    var respuesta;
    var formData = {
      photography: fs.createReadStream('resources/vista.jpg'),
    };
    request.post({url:'https://guiame.duckdns.org/api/v1/descriptivo/', formData: formData}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        respuesta = 'upload failed';
      }
      respuesta = JSON.parse(body);
      fullfill(respuesta.objects);
    });
  });
}

module.exports = image;



