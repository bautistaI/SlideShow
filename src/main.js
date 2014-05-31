// Main.js

define(function(require, exports, module) {
	var Engine  = require('famous/core/Engine');

	//  import Utility
	var Utility = require('famous/utilities/Utility');

	//import the AppView class using require
	var AppView = require('views/AppView');

	//  imports SlideData
	var SlideData = require('data/SlideData');


	var mainContext = Engine.createContext();

	// Get request to the Picasa API with callback
	Utility.loadURL(SlideData.getUrl(), initApp);

	function initApp(data) {
		// parses out the response data and retrieves array of urls
		data = SlideData.parse(data);

		// instantiates AppView with our url data
		var appView = new AppView({ data : data });

		//add the instance to the context
		mainContext.add(appView);
	}
});