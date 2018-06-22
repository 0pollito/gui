var player = require('./lib/audio');

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
