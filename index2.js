var Gpio = require('pigpio').Gpio,
  button = new Gpio(4, {mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP, alert: true}),
  count = 0,
  trigger = new Gpio(23, {mode: Gpio.OUTPUT}),
  echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});
var say = require('say');
 
<<<<<<< HEAD
 var distancia = 0; //distancia del objeto detectado
 var cont = 0; //contador de objetos detectados
 var activado = 0; //activacion de sensor
// var objectDetected = 0;
=======
 var distancia = 0;
 var contObject = 0;
 var activado = 0;
>>>>>>> 9eb39fc26002416b3fe0e0ab4afdf6c48cde6e01
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
<<<<<<< HEAD
	activado = 10;
=======
        activado = 10;
>>>>>>> 9eb39fc26002416b3fe0e0ab4afdf6c48cde6e01
        sensar();
      }else{
        count--;
        console.log('Modo Reconocimiento :: '+count);
        activado = 0;
<<<<<<< HEAD
	let reconocimiento = new Promise((resolve,reject)=>{
         say.speak('Modo Reconocimiento iniciado');
	 resolve(sig);
	}).then(sig => internet());
=======
        say.speak('Modo Reconocimiento iniciado');
>>>>>>> 9eb39fc26002416b3fe0e0ab4afdf6c48cde6e01
      }
    }
  });
});

function internet(){
 require('dns').resolve('www.google.com',function(err){
	if(err){
	 say.speak('sin conexion a internet');
	}else{
	 say.speak('Con internet');
	}
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 9eb39fc26002416b3fe0e0ab4afdf6c48cde6e01
  }, 2000);
}


require('dns').resolve('www.google.com', function(err) {
  if (err) {
     console.log("No connection");
  } else {
     console.log("Connected");
  }
});