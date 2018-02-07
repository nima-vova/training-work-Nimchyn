(function ($) {
	$.widget("my.slider", {

		// create default options
		options: {
			images: [
				['slider-text-welcome.png', 'slider-text-we-provide.png'],
				['slide-1.png', 'slide-1.png'], ['slide-2.png', 'slide-2.png'],
				['slide-3.png', 'slide-3.png']],
			speed: 1000,
		},

		// constructor- where the element is assigned a click handler
		_create: function () {
			var thas = this;
			this.element.click(function () {
				//if the animation does not end, then when click on an element, nothing is done
				if ($('.' + thas.options.element).is(':animated'))
					return false;

				thas._createOptionsForStep();
			});

		},

		// create options for starting the animation,
		// and determine the pointer of the animation (in the left or right)
		_createOptionsForStep: function (event) {
			var element = this.options.element;
			this.animationElement = element;
			this.speed = this.options.speed;
			this.transformType = this.options.transformType;
			this.cloneElement = $('.' + element).clone();
			this.width = parseInt($('.' + element).css("width"));
			this.imagesNavigation = this.options.images;
			this.numberId = parseInt($('.' + element + ':eq(0)').attr('id'));
			var arraySymbolsId = $('.' + element + ':eq(0)').attr('id').split(this.numberId);
			this.symbolId = arraySymbolsId[1];

			this.pointer = "right";
			if ($(this.element).hasClass("next-left")) {
				this.pointer = "left";
				return this._insertInLeft();
			}

			return this._insertInRight();
		},

		//where an element (animation block) is created for the animation to the left.
		//When checking the element id and we determine which images from the array we insert
		//for the new element of the slide after an existing element.
		//After installation, the item is not displayed, because it is outside the block
		//(parent element is css overflow: hidden). Therefore, we call the anomation function
		//(animateStepByStep) for the slide movement.
		_insertInLeft: function () {
			if (this.numberId !== this.imagesNavigation.length - 1) {
				this.cloneElement.find('img:eq(0)').attr('src', 'img/' + this.imagesNavigation[this.numberId + 1][0]);
				this.cloneElement.find('img:eq(1)').attr('src', 'img/' + this.imagesNavigation[this.numberId + 1][1]);
				this.cloneElement.attr('id', this.numberId + 1 + this.symbolId);
				$('.' + this.animationElement + ':eq(0)').after(this.cloneElement);
			} else {
				this.cloneElement.find('img:eq(0)').attr('src', 'img/' + this.imagesNavigation[0][0]);
				this.cloneElement.find('img:eq(1)').attr('src', 'img/' + this.imagesNavigation[0][1]);
				this.cloneElement.attr('id', '0' + this.symbolId);
				$('.' + this.animationElement + ':eq(0)').after(this.cloneElement);
			}

			this._animateStepByStep();
		},

		//is created for animation on the right.
		//When checking the element identifier, we determine which images from the array
		//we insert for the new slider element before the existing element.
		//After install, the item is not displayed(marginLeft', '-' + this.width + 'px') because it is outside the block
		//(parent item is css overflow: hidden).
		//Therefore, we call an anomation function (animateStepByStep) for slide motion.
		_insertInRight: function () {
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

			$('.' + this.animationElement + ':eq(0)').before(this.cloneElement);
			this._animateStepByStep();
		},

		// method is created for animation to the left and right
		// using the jquery function .animate() (changing marginLeft)
		_animateStepByStep: function () {
			var element = this.animationElement;
			var pointer = this.pointer;
			var speed = this.speed;
			var transformType = this.transformType;
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
			$('.' + this.animationElement + ':eq(0)').animate({marginLeft: marginToTheLeft}, {
				// At each step of the animation the element rotates
				// - the rotate transforme, and the rotate parameter is passed
				step: function (now) {
					// if the animation step is finite, then we delete the element of the previous one
					// (if the left one is the first if it is right then the second one)
					// and the parameter now = 0
					// (for the element to be in equal evenly placed horizontally)
					if (Math.abs(now) == widthElement) {
						now = 0;
						$('.' + element + ':eq(' + indexEq + ')').remove();
					}
					if (transformType == 'rotate') {
						$('.' + element).css('-webkit-transform', 'rotate(' + now + 'deg)');
						$('.' + element).css('-moz-transform', 'rotate(' + now + 'deg)');
						$('.' + element).css('-o-transform', 'rotate(' + now + 'deg)');
					}
				},
				duration: speed
			});
		},
	});
})(jQuery);
