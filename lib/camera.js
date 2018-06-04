var RaspiCam = require('raspicam');

var cam = new RaspiCam({
  mode: "photo",
  output: "./resources/vista.jpg",
  e: "jpg",
  v: true,
  n: true
});

var camera = {};

camera.photo = function() {
  return new Promise(function(fullfill,reject){
    cam.start();
    fullfill('Foto tomada');
  });
}

module.exports = camera;
