define([
	'utils',
	'accelo'
],
function(utils, Accelo){
	
	'use strict';
	var $ = utils.$;
	var logging = true;
	var level = 5;
	var threshold = 50;
	var logger = $('log');
	var btn = $('logBtn');
	var dude = $('dude');
	var graphic = dude.getElementsByClassName('graphic')[0];
	var acc;

	var checkSobriety = function(degrees){
		return Math.abs(degrees) <= threshold;
	};

	var fail = function(){
		graphic.classList.add('fail');
		acc.stop();
	}

	var updateLog = function(){
		logging = !logging;
		if( logging ){
			btn.innerHTML = "don't log" ;
			logger.classList.add('show');
		}
		else{
			btn.innerHTML = "log" ;
			logger.classList.remove('show');
		}
	}


	var handleAccelo = function(update){
		var fb = update.tiltFB - 90;
		var lr = update.tiltLR;
		var degrees = lr * level;
		
		if( checkSobriety(degrees) ){
			graphic.setAttribute("style","transform:rotate(" + degrees + "deg)");
		} else {
			fail();
		}

		if(logging) logger.innerHTML = degrees;
	};


	var initialize = function(){
		btn.addEventListener('click', updateLog );
		updateLog();
		acc = new Accelo( { 
			element: dude,
			callback: handleAccelo,
			auto: true
		} );

	};

	return {
		init: initialize
	}
	
});
