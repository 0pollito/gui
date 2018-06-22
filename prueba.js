var player = require('./lib/audio');

player.play("tecnología, mucha tecnología")
  .then(player.play("otra línea de texto"));
