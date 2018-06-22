var exec = require('child_process').exec, child;
var command = 'echo "El miércoles es el cuarto día de la semana." | iconv -f utf-8 -t iso-8859-1 | festival --tts';
child = exec(command, function(error,stdout,stderr) {
  console.log(stdout);
  if(error != null){
    console.log('exec error: ' + error);
  }
})


/*
checar 
const clipboardy = require('clipboardy');

// Copy
clipboardy.writeSync('akjsdhka');

// Paste
clipboardy.readSync('akjshdka');
 */