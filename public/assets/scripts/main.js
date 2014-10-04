require.config({
    paths: {
		utils:'ore.utils',
		accelo:'ore.accelo',
		walkalizer:'ore.walkalizer'
	}
});

define(["walkalizer"], function(Walkalizer) {
	
	'use strict';
	
	Walkalizer.init();

});


