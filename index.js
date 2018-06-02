var Gpio = require('pigpio').Gpio,
  button = new Gpio(4, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    alert: true
  }),
  count = 0;
 
// Level must be stable for 50 ms before an alert event is emitted.
button.glitchFilter(50000);
 
button.on('alert', (level, tick) => {
  if (level === 0) {
    console.log(++count);
  }
});