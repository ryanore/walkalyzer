define([
    'utils'
], 
function(utils){

    'use strict';

    var Accelo = function(options){
        this.element = options.element;
        this.callback = options.callback;
        this.initialX = null;
        this.initialY = null;
        this.handler = this.handleOrientationEvent.bind(this);
        
        if (! window.DeviceOrientationEvent) {
            callback({unsupported: true})
            console.log('NOT SUPPORTED');
            return false;
        }
        else{
            console.log('SUPPORTED');

        }

        if( options.auto ){
            this.start();
        }
    };


    Accelo.prototype.handleOrientationEvent = function(){
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


    Accelo.prototype.start = function(){
        window.addEventListener("deviceorientation", this.handler);
    };


    Accelo.prototype.stop = function(){
        window.removeEventListener("deviceorientation", this.handler);
    };

    return  Accelo;

});