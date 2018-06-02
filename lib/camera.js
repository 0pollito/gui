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
  cam.start();
}

module.exports = camera;
