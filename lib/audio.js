var exec = require('child_process').exec, child;
var player = {};

player.play = function(text){
  
  var command = 'echo "'+text+'" | iconv -f utf-8 -t iso-8859-1 | festival --tts';
  
  return new Promise(function(resolve,reject){
    child = exec(command, function(error,stdout,stderr) {
      if(error != null){
        console.log('exec error: ' + error);
        reject();
      }
      resolve();
    });
  });
}

module.exports = player;





