// SlideshowView

define(function(require, exports, module){
	//dependencies
	var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    // Import SlideView class
    var SlideView = require('views/SlideView');

    function SlideshowView(){
    	View.apply(this, arguments);

        //new instance of SlideView
        var slideview = new SlideView();

        // add the instance
        this.add(slideview)
    }

    SlideshowView.prototype = Object.create(View.prototype);
    SlideshowView.prototype.constructor = SlideshowView;

    //Default options
    SlideshowView.DEFAULT_OPTIONS = {};

    //Define helper functions and prototype methods here
    module.exports = SlideshowView;
});