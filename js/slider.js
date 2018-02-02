/*jshint esversion: 6 */
(function($) {    
    //create a class constructor and declare its properties public(this.property), private(var)
    function CreateOptionsForStep(parameters) {
        var pointer = parameters.pointer;
        var element = parameters.element;
        var imges = parameters.imges;
        var transformEffect = parameters.transformEffect;
        var speed = parameters.speed || (parameters.speed = 1500);
        this.element = element;
        this.pointer = pointer;
        this.speed = speed;
        this.transformEffect = transformEffect;
        this.cloneElement = $('.' + element).clone();
        this.width = parseInt($('.' + element).css("width"));
        //if you do not pass an array of pictures then we form the default array    
        this.imagesNavigation = $.extend([
            ['slider-text-welcome.png', 'slider-text-we-provide.png'],
            ['slide-1.png', 'slide-1.png'],
            ['slide-2.png', 'slide-2.png'],
            ['slide-3.png', 'slide-3.png']
        ], imges);
        this.numberId = parseInt($('.' + element + ':eq(0)').attr('id'));
        var ArraySymbolsId = $('.' + element + ':eq(0)').attr('id').split(this.numberId);
        this.symbolId = ArraySymbolsId[1];
        alert(speed);
    }
    //create a method in the prototype 
    //where an element (animation block) is created for the animation to the left.
    //When checking the element id and we determine which images from the array we insert 
    //for the new element of the slide after an existing element. 
    //After installation, the item is not displayed, because it is outside the block 
    //(parent element is csS overflow: hidden). Therefore, we call the anomation function 
    //(animateStepByStep) for the slide movement.
    CreateOptionsForStep.prototype.insertElementInLeft = function() {
        if (this.numberId !== this.imagesNavigation.length - 1) {
            this.cloneElement.find('img:eq(0)').attr('src', 'img/' + this.imagesNavigation[this.numberId + 1][0]);
            this.cloneElement.find('img:eq(1)').attr('src', 'img/' + this.imagesNavigation[this.numberId + 1][1]);
            this.cloneElement.attr('id', this.numberId + 1 + this.symbolId);
            $('.' + this.element + ':eq(0)').after(this.cloneElement);
        } else {
            this.cloneElement.find('img:eq(0)').attr('src', 'img/' + this.imagesNavigation[0][0]);
            this.cloneElement.find('img:eq(1)').attr('src', 'img/' + this.imagesNavigation[0][1]);
            this.cloneElement.attr('id', '0' + this.symbolId);
            $('.' + this.element + ':eq(0)').after(this.cloneElement);
        }

        this.animateStepByStep();
    };
    //method is created in the prototype where an element (animation block) 
    //is created for animation on the right. 
    //When checking the element identifier, we determine which images from the array 
    //we insert for the new slider element before the existing element. 
    //After install, the item is not displayed(marginLeft', '-' + this.width + 'px') because it is outside the block 
    //(parent item is csS overflow: hidden). 
    //Therefore, we call an anomation function (animateStepByStep) for slide motion.
    CreateOptionsForStep.prototype.insertElementInRight = function() {
        
        //if ($('.'+this.element).data("foo")=='enabled')
          //    return false;    

            //alert($('.'+this.element).data( "foo"));
        //$('.'+this.element).data( "foo", "enabled");    
    

        if (this.numberId !== 0) {
            this.cloneElement.find('img:eq(0)').attr('src', 'img/' + this.imagesNavigation[this.numberId - 1][0]);
            this.cloneElement.find('img:eq(1)').attr('src', 'img/' + this.imagesNavigation[this.numberId - 1][1]);
            this.cloneElement.attr('id', this.numberId - 1 + this.symbolId);
            this.cloneElement.css('marginLeft', '-' + this.width + 'px');
        } else {
            this.cloneElement.find('img:eq(0)').attr('src', 'img/' + this.imagesNavigation[this.imagesNavigation.length - 1][0]);
            this.cloneElement.find('img:eq(1)').attr('src', 'img/' + this.imagesNavigation[this.imagesNavigation.length - 1][1]);
            this.cloneElement.attr('id', (this.imagesNavigation.length - 1) + this.symbolId);
            this.cloneElement.css('marginLeft', '-' + this.width + 'px');
        }

        $('.' + this.element + ':eq(0)').before(this.cloneElement);

        this.animateStepByStep();
        //$('.'+this.element).data( "foo", "closed");
    };
    // method is created in the prototype for animation to the left and right
    // using the jquery function .animate() (changing marginLeft) 
    CreateOptionsForStep.prototype.animateStepByStep = function() {
        var step = 0;
        var element = this.element;
        var pointer = this.pointer;
        var speed = this.speed;
        var transformEffect = this.transformEffect;
        var marginToTheLeft = '0px';
        var indexEq = 1;
        var widthElement = 0;
        //  if the pointer to the left, then the animation will be from 
        // negative marginlift to 0, and define the index (indexEq = 0) of the item to be deleted after the animation 
        if (pointer == 'left') {
            marginToTheLeft = '-' + this.width + 'px';
            indexEq = 0;
            widthElement = this.width;
        }
        // animation is performed (the element shifts after changing the marginLeft)  
        $('.' + this.element + ':eq(0)').animate({ marginLeft: marginToTheLeft }, {
            // At each step of the animation the element rotates 
            // - the rotate transforme, and the rotate parameter is passed
            step: function(now, fx) {
                // if the animation step is finite, then we delete the element of the previous one 
                // (if the left one is the first if it is right then the second one) 
                // and the parameter now = 0 
                // (for the element to be in equal evenly placed horizontally)
                if (Math.abs(now) == widthElement) {
                    now = 0;
                    $('.' + element + ':eq(' + indexEq + ')').remove();
                }
                if (transformEffect == 'rotate')
                    $('.' + element).css('-webkit-transform', 'rotate(' + now + 'deg)');
            },
            duration: speed
        });
    };
    // create a new property-function for the object jQuery,  
    // that will be an instance for the class CreateOptionsForStep
    $.fn.startNavigation = function(element, imges, transformEffect, speed) {
        this.click(function() {     
            if ($('.'+element).is(':animated'))
                return false;

            var pointer = "right";
            if ($(this).hasClass("next-left"))
                pointer = "left";            
            var startNavigation = new CreateOptionsForStep({
                pointer: pointer,
                element: element,
                imges: imges,
                transformEffect: transformEffect,
                speed: speed
            });
            if (pointer == 'left')
                return startNavigation.insertElementInLeft();

            return startNavigation.insertElementInRight();
        });
    };
})(jQuery);
