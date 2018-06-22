var player = require('./lib/audio');

player.play("primera línea")
  .then(function (){
    return player.play("segunda línea de texto")
  })
  .then(function () {
    return player.play("ultima línea reproduciendo")
  });
