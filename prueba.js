var camera = require('./lib/camera');
var image = require('./lib/image');

console.log('abriendo camera');
camera.photo().then(function(foto){
  console.log(foto);
  return image.sendImage().then(function(respuesta){
    console.log(respuesta);
  });
});