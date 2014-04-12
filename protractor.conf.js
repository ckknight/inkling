exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	capabilities: {
		'browserName': 'chrome'
	},
	framework: 'cucumber',
	specs: ['features/addValue.feature'],
	cucumberOpts: {
		format: 'pretty',
	},
	allScriptsTimeout: 15000
};