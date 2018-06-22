var exec = require('child_process').exec, child;
var player = {};

player.play = function(text){
  
  var command = 'echo "'+text+'" | iconv -f utf-8 -t iso-8859-1 | festival --tts';
  
  return new Promise(function(resolve,reject){
    var state = true;
    child = exec(command, function(error,stdout,stderr) {
      if(error != null){
        state = false;
        console.log('exec error: ' + error);
      }
    });
    if(state)
      resolve();
    else
      reject();
  });
}

module.exports = player;





