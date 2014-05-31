// SlideshowView

define(function(require, exports, module){
	//dependencies
	var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Lightbox = require('famous/views/Lightbox');

    // make sure you require the SlideView
    var SlideView = require('views/SlideView');

                                /*************************/
                                /**     CONSTRUCTOR     **/
                                /*************************/

    function SlideshowView(){
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            size: this.options.size,
            origin: [0.5, 0],
            align:  [0.5, 0]
        });

        this.mainNode = this.add(this.rootModifier);

        // make sure you invoke the helper function
        // in the right context by using .call()
        _createLightbox.call(this);
        _createSlides.call(this);
    }


                                /*****************************/
                                /**  PROTOTYPE INHERITANCE  **/
                                /*****************************/

    SlideshowView.prototype = Object.create(View.prototype);

    SlideshowView.prototype.constructor = SlideshowView;

    SlideshowView.prototype.showCurrentSlide = function() {
        var slide = this.slides[this.currentIndex];
        this.lightbox.show(slide);
    };

    SlideshowView.prototype.showNextSlide = function() {
        this.currentIndex++;
        if(this.currentIndex === this.slides.length)this.currentIndex = 0;
            this.showCurrentSlide();
    };


    
                                /*************************/
                                /**  DEFAULT OPTIONS    **/
                                /*************************/

    SlideshowView.DEFAULT_OPTIONS = {
        size: [450, 500],
        data: undefined,
        lightboxOpts: {}
    };


                                /*********************************/
/*******************************    PRIVATE HELPER FUNCTIONS      ***************************************/
                                /*********************************/

    function _createLightbox() {
        this.lightbox = new Lightbox(this.options.lightboxOpts);

        this.mainNode.add(this.lightbox);
    }



    function _createSlides() {
        this.slides = [];
        this.currentIndex = 0;

        for (var i = 0; i < this.options.data.length; i++) {
            var slide = new SlideView({
                size: this.options.size,
                photoUrl: this.options.data[i]
            });

            this.slides.push(slide);

            // adding click listener
            // on click, calling .showNextSlide()
            // note that we're binding showNextSlide to the slideshow
            // to maintain the correct context when called
            slide.on('click', this.showNextSlide.bind(this));

        }

        // show method from the prototype SlideshowView object
        this.showCurrentSlide();
    }

    

// ******************************************************************************************

    module.exports = SlideshowView;
});