var Gpio = require('pigpio').Gpio,
  button = new Gpio(4, {mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP, alert: true}),
  count = 0,
  trigger = new Gpio(23, {mode: Gpio.OUTPUT}),
  echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});
var say = require('say');
 
 var distancia = 0;

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
        sensar();
      }else{
        count--;
        console.log('Modo Reconocimiento :: '+count);
        trigger.digitalWrite(0);
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
        if(distancia < 20){
          say.speak('Cuidado, obstaculo detectado');
          console.log('Objeto detectado :: '+distancia);
        }
      }
    });
  }());
  // Trigger a distance measurement once per two second
  setInterval(function () {
    trigger.trigger(10, 1); // Set trigger high for 10 microseconds
  }, 2000);
}
