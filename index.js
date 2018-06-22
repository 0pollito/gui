var Gpio = require('pigpio').Gpio,
  button = new Gpio(4, {mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP, alert: true}),
  count = 0,
  trigger = new Gpio(23, {mode: Gpio.OUTPUT}),
  echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

//var say = require('say');

var request = require('request');
var player = require('./lib/audio');
var camera = require('./lib/camera');
var image = require('./lib/image');
 
 var distancia = 50; //distance detected object
 var cont = 0; //count of detected objects
 var activado = 0; //sensor activation

// Level must be stable for 50 ms before an alert event is emitted.
button.glitchFilter(50000);

player.play("Iniciando Asistente Guíame")
  .then(function() {
    button.on('alert', (level, tick) => {
    if (level === 0) {
      if(count==0){
        count++;
        activado = 10;
        player.play("Modo Preventivo")
          .then(function(){
            sensar();
          });
      }else{
        count--;
        activado = 0;
        player.play('Modo Reconocimiento')
          .then(function() {
            return internet()
          })
          .then(function(){
            return camera.photo()
          })
          .then(function() {
            return image.sendImage()
              .then(function(respuesta){
                console.log(respuesta);
                return player.play(respuesta);
              })
          })
          .catch(function(err) {
            console.error(err);
          }); 
      }
    }
  });
}).catch(function(err) {
    console.error(err);
}); 

function internet(){
  return new Promise(function(resolve,reject){
     require('dns').resolve('www.google.com',function(err){
      if(err){
        player.play('sin conexión a internet')
          .then(function(){
            reject();
          });
      }
      resolve();
     });
  });
}

//function to detect obstacles
function sensar(){
  // The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
  var MICROSECDONDS_PER_CM = 1e6/34321;
 
  trigger.digitalWrite(0); // Make sure trigger is low
 
  (function () {
    var startTick;
    echo.on('alert', function (level, tick) {
      var endTick,
        diff;
      if (level == 1) {
        startTick = tick;
      } else {
        endTick = tick;
        diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
        distancia = diff / 2 / MICROSECDONDS_PER_CM;
      }
    });
  }());
  // Trigger a distance measurement once per two second
  setInterval(function () {
    if(activado == 0){
     trigger.digitalWrite(0); 
    }else{
     trigger.trigger(activado, 1); // Set trigger high for 10 microseconds
     if(distancia < 20){
       cont++;
       if(cont == 1)
         player.play('Obstaculo detectado');
      }else{
       cont = 0;
      }
    console.log(distancia+' '+cont);
   }
  }, 2000);
}


