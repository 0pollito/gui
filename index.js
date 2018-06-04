var Gpio = require('pigpio').Gpio,
  button = new Gpio(4, {mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP, alert: true}),
  count = 0,
  trigger = new Gpio(23, {mode: Gpio.OUTPUT}),
  echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

var say = require('say');
var request = require('request');
var camera = require('./lib/camera');
var image = require('./lib/image');
 
 var distancia = 0; //distancia del objeto detectado
 var cont = 0; //contador de objetos detectados
 var activado = 0; //activacion de sensor
// var objectDetected = 0;

 var distancia = 50;
 var contObject = 0;
 var activado = 0;

// Level must be stable for 50 ms before an alert event is emitted.
button.glitchFilter(50000);

function play(text){
  return new Promise(function (fulfill, reject){
    console.log('reproduciendo =', text);
    say.speak(text);
    fulfill({ value: text});
  });
}

play('Iniciando Asistente Guiame').then(function(obj) {
    console.log('terminado de reproducir =', obj.value);
    button.on('alert', (level, tick) => {
    if (level === 0) {
      if(count==0){
        count++;
        say.speak('Modo Preventivo Iniciado');
        activado = 10;
        sensar();
      }else{
        count--;
        activado = 0;
        play('Modo Reconocimiento iniciado').then(function(obj) {
          console.log('END execution with value =', obj.value);
          return internet().then(function(notify){
              play(notify);
            }).catch(function(notify){
              play(notify);
            });
        }).then(function(obj) {
            console.log('termino de reproducir =', obj.value);
            console.log('tomando foto');
            if(obj.value != 'sin conexion a internet'){
              console.log('abriendo camera');
              camera.photo().then(function(foto){
                console.log(foto);
                return image.sendImage().then(function(respuesta){
                  console.log(respuesta);
                  say.speak(respuesta);
                });
              });
            }
        }).catch(function(err) {
            console.error(err);
        }); 
      }
    }
  });
}).catch(function(err) {
    console.error(err);
}); 

function internet(){
  return new Promise(function(fulfill,reject){
    var notify = '';
     require('dns').resolve('www.google.com',function(err){
      if(err){
      notify = 'sin conexion a internet';
       reject(notify);
      }
      fulfill(notify);
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
         say.speak('Cuidado obstaculo detectado');
      }else{
       cont = 0;
      }
    console.log(distancia+' '+cont);
   }
  }, 2000);
}


