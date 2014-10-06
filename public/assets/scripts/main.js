require.config({
    paths: {
		utils:'ore.utils',
		accelo:'ore.accelo',
		counter:'ore.counter',
		walkalizer:'ore.walkalizer'
	}
});

define(["walkalizer"], function(Walkalizer) {
	
	'use strict';
	
	Walkalizer.init(true);

});


