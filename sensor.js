const say = require('say');
require('dns').resolve('www.google.com',function(error){
	if(error){
	 say.speak('Sin internet');
	}else{
	 say.speak('conectado a internet');
	}
});
