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
  return new Promise(function(resolve,reject){
    cam.start();
    camera.on("read", function(err, timestamp, filename){ 
      console.log(timestamp);
      console.log(filename);
      resolve('Foto tomada');
    });
    /*cam.on("exit", function(){
      resolve('Foto tomada');
    });*/
  });
}

module.exports = camera;
