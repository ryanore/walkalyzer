define([
	'utils',
	'accelo',
	'counter'
],
function(utils, Accelo, Counter){
	'use strict';
	var isCordova = typeof cordova !== 'undefined';
	var $ = utils.$;
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

	/**
	 *	App State Active
	 *	set state on the body and start everything.
	 */
	var startTest = function(){	
		degrees = 0;
		app.setAttribute("data-state", 'active');
		acc.start();

		setTimeout(function(){
			listening = true;
			counter.start();
		}, 1000);
	};

	/**
	 *	App State Fail
	 *	set state on the body and stop everything.
	 */
	var fail = function(){
		listening = false;

		graphic.setAttribute("style","-webkit-transform:rotate(0deg)");

		app.setAttribute("data-state", 'fail');

		acc.stop();

		counter.stop();
	};

	/**
	 *	App State Pass
	 *	set state on the body and stop everything.
	 */
	var pass = function(){
		listening = false;

		app.setAttribute("data-state", 'pass');
		
		counter.stop();

		acc.stop();
	};

	/**
	 *	Do the math, if orientation event doesn't surpass threshold.
	 *  @return Boolean
	 */
	var checkSobriety = function(){
		return Math.abs(degrees) <= threshold;
	};

	/**
	 *	Update state, whether loggin or not.
	 */
	var updateLog = function(tf){
		
		logging = tf || false;

		if( logging ){
			app.classList.add('debug');
		}
		else{
			app.classList.remove('debug');
		}
	};


	/**
	 *	Accelo is an instance of ore.accelo.js
	 *	@param update Object
	 */	
	 var handleAccelo = function(update){
		if( !listening) return false;
		var fb = update.tiltFB ;
		var lr = update.tiltLR;
		degrees = lr * level;
		var betaInterference = 90 - Math.abs(fb);
		
		if( betaInterference < 3 ){}

		if( checkSobriety() ){
			graphic.setAttribute("style","-webkit-transform:rotate(" + degrees + "deg)");
		} else {
			fail();
		}
		if(logging){
			logger.innerHTML = 'b: '+fb +'<br><br>g: '+lr ;
		}
	};

	/**
	 *	Counter is an instance of ore.counter.js
	 *	@param e Event
	 */
	var handleCounter = function(e){
		if(e.detail === 0){
			pass();
		}
	};

	/**
	 *	About modal Open
	 *	set state on the body and stop everything.
	 */
	var showAbout = function(e){
		$('about').classList.add('show');
	};

	/**
	 *	About modal Close
	 *	set state on the body and stop everything.
	 */
	var closeAbout = function(e){
		$('about').classList.remove('show');
	};

	/**
	 * 	Initialize the application's event listeners, and set state.
	 *	If this is a Phonegap/Cordova app, then don't use a faux splash screen.
	 *	@param debug Boolean
	 */
	var initialize = function(debug){
		updateLog(debug);

		acc = new Accelo( { 
			element: dude,
			callback: handleAccelo
		} );

		counter = new Counter( {
			el: $('counter'),
			limit: 10
		});

		btn.addEventListener('click', startTest );
		$('logo').addEventListener('click', showAbout);
		$('close').addEventListener('click', closeAbout);
		app.addEventListener('tic', handleCounter );
		
		if( isCordova ){
			app.setAttribute("data-state", 'ready');
			return true;
		}
		
		// if it's not a phonegap app, then use faux splash page
		app.setAttribute("data-state", 'splash');
		if(acc.support){
			setTimeout( function(){
				app.setAttribute("data-state", 'ready');
			}, 3000);
		} else {
			$('splash').classList.add('no-support');
		}		
	};

	return {
		init: initialize
	};
	
});
