var camera = require('./lib/camera');
var image = require('./lib/image');


image.sendImage().then(function(respuesta){
  console.log(respuesta);
});