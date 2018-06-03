var Gpio = require('pigpio').Gpio,
  button = new Gpio(4, {mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP, alert: true}),
  count = 0,
  trigger = new Gpio(23, {mode: Gpio.OUTPUT}),
  echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});
var say = require('say');
 
 var distancia = 0;
 var contObject = 0;
 var activado = 0;
// Level must be stable for 50 ms before an alert event is emitted.
button.glitchFilter(50000);

let inicio = new Promise((resolve, reject) => {
  say.speak('Iniciando Asistente Guíame');
  resolve("¡Guíame Iniciada!");
}).then( (successMessage)=> {
  //Init button listener
  button.on('alert', (level, tick) => {
    if (level === 0) {
      if(count==0){
        count++;
        console.log('Modo Preventivo :: '+count);
        say.speak('Modo Preventivo Iniciado');
        activado = 10;
        sensar();
      }else{
        count--;
        console.log('Modo Reconocimiento :: '+count);
        activado = 0;
        say.speak('Modo Reconocimiento iniciado');
      }
    }
  });
});



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
    trigger.trigger(activado, 1); // Set trigger high for 10 microseconds
    
    if(distancia < 20){
      contObject++;
      if(contObject == 1){
        say.speak('Cuidado, obstaculo detectado');
      }
      console.log('Objeto detectado :: '+distancia+' Obje'+contObject);
    }else{
      console.log('Objeto detectado :: '+distancia+' Obje'+contObject);
      contObject = 0;
    }
  }, 2000);
}


require('dns').resolve('www.google.com', function(err) {
  if (err) {
     console.log("No connection");
  } else {
     console.log("Connected");
  }
});