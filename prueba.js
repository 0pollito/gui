var player = require('./lib/audio');

player.play("tecnología, mucha, pero mucha tecnología")
  .then(() => player.play("tecnología, mucha, pero mucha tecnología"));
