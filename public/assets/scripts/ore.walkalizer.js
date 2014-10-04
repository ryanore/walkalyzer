define([
	'utils',
	'accelo'
],
function(utils, Accelo){
	'use strict';
	var $ = utils.$;
	var acc;
	var logging = true;
	var level = 5;
	var threshold = 45;
	var app = $('app');
	var logger = $('log');
	var btn = $('startBtn');
	var dude = $('dude');
	var graphic = dude.getElementsByClassName('graphic')[0];

	var checkSobriety = function(degrees){
		return Math.abs(degrees) <= threshold;
	};


	var fail = function(){

		app.setAttribute("data-state", 'fail');

		acc.stop();
	};


	var updateLog = function(){

		logging = !logging;
		if( logging ){
			logger.classList.add('show');
		}
		else{
			logger.classList.remove('show');
		}
	};

	var handleAccelo = function(update){
		var fb = update.tiltFB ;
		var lr = update.tiltLR;
		var degrees = lr * level;
		
		if( checkSobriety(degrees) ){
			graphic.setAttribute("style","-webkit-transform:rotate(" + degrees + "deg)");
		} else {
			fail();
		}

		if(logging){
			logger.innerHTML = degrees;
		}
	};

	var startTest = function(){	
		app.setAttribute("data-state", 'active');
		acc.start()
	};


	var initialize = function(){
		updateLog();
		
		btn.addEventListener('click', startTest );
	
		acc = new Accelo( { 
			element: dude,
			callback: handleAccelo
		} );

		app.setAttribute("data-state", 'ready');
	};

	return {
		init: initialize
	}
	
});
