// SlideView

define(function(require, exports, module){
	//dependencies
	var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');


/**************************************************************************/
//                         FUNCTION SLIDEVIEW
//       After adding the state modifier( * ), we save a reference to the 
//  new render node ( ** ). Everything added below this node will inherit the size 
//  of the modifier we just created. We will be adding to this node as we create 
//                             our surfaces.
/**************************************************************************/
    function SlideView(){
    	View.apply(this, arguments);

        //( * )state modifier so we can add a size
        this.rootModifier = new StateModifier({
            size: [400, 450]
        });

        //( ** ) save a reference to the new node
        this.mainNode = this.add(this.rootModifier);

        // make sure you invoke the helper function
        // in the right context by using .call()
        _createBackground.call(this);

    }




    /*****************************/
    /**  PROTOTYPE INHERITANCE **/
    /*****************************/
    SlideView.prototype = Object.create(View.prototype);
    SlideView.prototype.constructor = SlideView;


    /*************************/
    /**  DEFAULT OPTIONS    **/
    /*************************/
    SlideView.DEFAULT_OPTIONS = {};




    /*********************************/
    /**  PRIVATE HELPER FUNCTIONS   **/
    /*********************************/

    // the _ before the function name indicates it's a private function
    // DON'T FORGET TO INVOKE THIS FUNCTION INSIDE THE SlideView function!!!
    function _createBackground(){
        // adding the surface for our photos
        var background = new Surface({
            //undefined size inherits size from parent modifier(400, 450)
            properties: {
                backgroundColor: '#FFFFF5',
                boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
            }
        });

        // ======= add the background to the mainNode ========
        this.mainNode.add(background);
    }


    //Define helper functions and prototype methods here
    module.exports = SlideView;
});