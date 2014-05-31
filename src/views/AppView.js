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
    //var SlideView = require('views/SlideView');


    function AppView(){
        View.apply(this, arguments);

        // passing in data
        var slideshowView = new SlideshowView({
            data: this.options.data
        });

        this.add(slideshowView);
    }


                                /*****************************/
                                /**  PROTOTYPE INHERITANCE  **/
                                /*****************************/

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;


                                /*************************/
                                /**  DEFAULT OPTIONS    **/
                                /*************************/

    AppView.DEFAULT_OPTIONS = {
        // it's a good idea to add a property in the default options
        // even when it's undefined    
        data: undefined
    };




    module.exports = AppView;
});