/***
AppView will serve as the top level view 
that contains our slideshow view and our 
camera surface.
***/

define(function(require, exports, module){
	var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');


    // importing the SlideshowView class
    var SlideshowView = require('views/SlideshowView');

    // importing the SlideView class
    var SlideView = require('views/SlideView');


    function AppView(){
    	View.apply(this, arguments);

        //new instance of SlideshowView
        var slideshowView = new SlideshowView();

        // add the instance to app view
        this.add(slideshowView);
    }


    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {};

    module.exports = AppView;
});