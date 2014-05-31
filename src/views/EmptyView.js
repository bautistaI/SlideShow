// EmptyView

define(function(require, exports, module){
	//dependencies
	var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    //Constructor function for our emptyview class
    function EmptyView(){
    	//using View constructor function on EmptyView class
    	View.apply(this, arguments);
    }

    //Establishing prototype chain for EmptyView class to inherit from View
    EmptyView.prototype = Object.create(View.prototype);
    EmptyView.prototype.constructor = EmptyView;

    //Default options
    EmptyView.DEFAULT_OPTIONS = {};

    //Define helper functions and prototype methods here
    module.exports = EmptyView;
});