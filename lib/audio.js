var Player = require('play-sound');
var audio = {};
 
//var url = '/home/pi/Desktop/Guiame/inicio.mp3';

audio.play = function(url,time) {
  player.play(url, { timeout: time }, function(err){
    if (err) throw err
    console.log("reproduciendo");
  });
}
module.exports = audio;