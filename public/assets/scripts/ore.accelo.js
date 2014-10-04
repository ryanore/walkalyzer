'use strict';

var ORE = ORE || {};


ORE.Accelo = function(options){
	this.element = options.element;
	this.callback = options.callback;
    this.initialX = null;
    this.initialY = null;
    this.handler = this.handleOrientationEvent.bind(this);
    
	if (! window.DeviceOrientationEvent) {
		callback({unsupported: true})
		return false;
	}

	if( options.auto ){
		this.start();
	}
};


ORE.Accelo.prototype.handleOrientationEvent = function(){
    var tiltFB = event.beta;
    var tiltLR = event.gamma;
    var dir = event.alpha;

    if (!this.initialX && !this.initialY) {

        this.initialX = tiltFB;
        this.initialY = tiltLR;

    } else {

        var posX = this.initialX - tiltFB;
        var posY = this.initialY - tiltLR;
        this.callback({
        	dir: dir,
        	tiltLR: tiltLR,
        	tiltFB: tiltFB,
        	posX: posX,
        	posY: posY 
        });
    }
};


ORE.Accelo.prototype.start = function(){
	window.addEventListener("deviceorientation", this.handler);
};


ORE.Accelo.prototype.stop = function(){
	window.removeEventListener("deviceorientation", this.handler);
};
