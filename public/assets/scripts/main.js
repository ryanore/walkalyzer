require.config({
    paths: {
		utils:'ore.utils',
		accelo:'ore.accelo',
		counter:'ore.counter',
		walkalizer:'ore.walkalizer'
	}
});

require(['walkalizer','utils'], function(Walkalizer, utils) {
	
	'use strict';

	var debug = utils.param('debug') && utils.param('debug') === 'true';

	Walkalizer.init(debug);

});

