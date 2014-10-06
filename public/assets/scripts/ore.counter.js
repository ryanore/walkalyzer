define([
    'utils'
], 
function(utils){

    'use strict';

    var Counter = function(options){
    	this.interval = null;
        this.el = options.el || null;
        this.limit = options.limit;
        this.remaining = options.limit ;
        this.options = options.callback;
        this.count = 0;
        this.handler = this.countHandler.bind(this);
        this.updateView();
    };

    Counter.prototype.updateView = function(){
       
        if( this.el ){
            this.el.innerHTML = this.remaining;
        }
    
    }

    Counter.prototype.countHandler = function(){

        var event = new CustomEvent('tic', { 'detail': this.remaining });
        if(this.remaining-- <= 0 ){
            this.remaining = 0;
            this.stop();
        }

        this.updateView();
        
        utils.$('app').dispatchEvent(event);

    };

    Counter.prototype.start = function(){
        this.remaining = this.limit;
        this.stop();
        this.interval = window.setInterval( this.handler, 1000 );
    };

    Counter.prototype.stop = function(){
        this.interval = window.clearInterval( this.interval );
        this.updateView();
    };

    return  Counter;

});