define([
	'utils',
	'accelo',
	'counter'
],
function(utils, Accelo, Counter){
	'use strict';
	var $ = utils.$;
	var el = $('app')
	var acc;
	var counter;
	var degrees = 0;
	var listening = false;
	var logging = false;
	var level = 1;
	var threshold = 30;
	var app = $('app');
	var logger = $('log');
	var btn = $('startBtn');
	var dude = $('dude');
	var graphic = dude.getElementsByClassName('graphic')[0];
	


	var startTest = function(){	
		degrees = 0;
		
		app.setAttribute("data-state", 'active');
			acc.start();

		setTimeout(function(){
			listening = true;
			counter.start();
		}, 1000);
		
	};


	var fail = function(){
		listening = false;

		graphic.setAttribute("style","-webkit-transform:rotate(0deg)");

		app.setAttribute("data-state", 'fail');

		acc.stop();

		counter.stop();
	};


	var pass = function(){
		
		listening = false;

		app.setAttribute("data-state", 'pass');
		
		counter.stop();

		acc.stop();

	};


	var updateLog = function(tf){

		logging = tf || !logging;

		if( logging ){
			logger.classList.add('show');
		}
		else{
			logger.classList.remove('show');
		}
	};


	var checkSobriety = function(){
		return Math.abs(degrees) <= threshold;
	};

	var handleAccelo = function(update){
		if( !listening) return false;
		var fb = update.tiltFB ;
		var lr = update.tiltLR;
		degrees = lr * level;

		var betaInterference = 90 - Math.abs(fb);
		console.log(fb)
		if( betaInterference < 3 ){
			
		}

		if( checkSobriety() ){
			graphic.setAttribute("style","-webkit-transform:rotate(" + degrees + "deg)");
		} else {
			// fail();
		}
		if(logging){
			// logger.innerHTML = degrees;
			logger.innerHTML = 'b: '+fb +'<br><br>g: '+lr ;
		}

	};


	var handleCounter = function(e){

		if(e.detail === 0){
			pass();
		}
	};


	var initialize = function(loggin){

		if(loggin) updateLog(loggin);

		acc = new Accelo( { 
			element: dude,
			callback: handleAccelo
		} );

		counter = new Counter( {
			el: $('counter'),
			limit: 30
		});

		btn.addEventListener('click', startTest );

		el.addEventListener('tic', handleCounter );
		
		setTimeout( function(){
			app.setAttribute("data-state", 'ready');
		}, 4000);
		
	};

	return {
		init: initialize,
		el: el
	}
	
});
