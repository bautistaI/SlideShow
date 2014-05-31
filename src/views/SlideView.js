// SlideView Class

define(function(require, exports, module){
	//dependencies
	var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var SlideData = require('data/SlideData');


/**************************************************************************/
//                    CONSTRUCTOR FUNCTION SLIDEVIEW
//       After adding the state modifier( * ), we save a reference to the 
//  new render node ( ** ). Everything added below this node will inherit the size 
//  of the modifier we just created. We will be adding to this node as we create 
//                             our surfaces.
/**************************************************************************/
    function SlideView(){
        View.apply(this, arguments);

        //( * )state modifier so we can add a size
        // this.options created from any options passed in during
        // instantiation and the default options (explanation below)
        this.rootModifier = new StateModifier({
            size: this.options.size
        });

        //( ** ) save a reference to the new node
        this.mainNode = this.add(this.rootModifier);

        // make sure you invoke the helper function
        // in the right context by using .call()
        _createBackground.call(this);
        _createFilm.call(this);
        _createPhoto.call(this);

    }

// **************************************************************************



                                /*************************/
                                /**  DEFAULT OPTIONS    **/
                                /*************************/

    // setting the size property in default options here
    SlideView.DEFAULT_OPTIONS = {
        size: [400, 450],
        filmBorder: 15,
        photoBorder: 3,
        photoUrl: SlideData.defaultImage
    };

// ************************************************************************** 


                                /*****************************/
                                /**  PROTOTYPE INHERITANCE  **/
                                /*****************************/

    SlideView.prototype = Object.create(View.prototype);
    SlideView.prototype.constructor = SlideView;


// ************************************************************************** 






                                /*********************************/
/*******************************    PRIVATE HELPER FUNCTIONS      ***************************************/
                                /*********************************/


                                /*********************************/
                                /**      CREATE BACKGROUND      **/
                                /*********************************/

    // The underscore before the function name indicates it's a private function
    // DON'T FORGET TO INVOKE THIS FUNCTION INSIDE THE  CONSTRUCTOR SlideView function!!!
    function _createBackground(){
        // adding the surface for our photos
        var background = new Surface({
            //undefined size inherits size from parent modifier(400, 450)
            properties: {
                backgroundColor: '#FFFFF5',
                boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)',
                cursor: 'pointer'
            }
        });

        // ======= add the background to the mainNode ========
        this.mainNode.add(background);

        // register click event on image to transition slides
        background.on('click', function() {
            //Event Output is used to broadcast outwards
            this._eventOutput.emit('click');
        }.bind(this));
    }


                                /*********************************/
                                /**         CREATE FILM         **/
                                /*********************************/

    function _createFilm(){
        this.options.filmSize = this.options.size[0] - 2 * this.options.filmBorder;

        var film = new Surface({
            size: [this.options.filmSize, this.options.filmSize],
            properties: {
                backgroundColor: '#222',
                zIndex: 1,
                // Prevent click events
                pointerEvents: 'none'
            }
        });

        var filmModifier = new StateModifier({
            origin: [0.5, 0],
            align:  [0.5, 0],
            transform: Transform.translate(0, this.options.filmBorder, 1)
        });

        this.mainNode.add(filmModifier).add(film);
    }


                                /*********************************/
                                /**          ADD PHOTO          **/
                                /*********************************/
    function _createPhoto(){
        var photoSize = this.options.filmSize - 2 * this.options.photoBorder;

        var photo = new ImageSurface({
            size: [photoSize, photoSize],
            content: this.options.photoUrl,
            properties: {
                zIndex: 2,
                // Prevent click events
                pointerEvents: 'none'
            }
        });

        this.photoModifier = new StateModifier({
            origin: [0.5, 0],
            align:  [0.5, 0],
            transform: Transform.translate(0, this.options.filmBorder + this.options.photoBorder, 2)
        });

        this.mainNode.add(this.photoModifier).add(photo);
    }


// *******************************************************************************************************    


    module.exports = SlideView;
});