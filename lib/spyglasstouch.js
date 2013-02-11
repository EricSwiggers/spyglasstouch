// JavaScript Document


	
(function($){
	//detect touch support
	$.support.touch = 'ontouchend' in document;
	var down = ($.support.touch) ? 'touchstart' : 'mousedown',
		move =($.support.touch) ? 'touchmove' : 'mousemove',
		up = ($.support.touch) ? 'touchend' : 'mouseup',
		splitEvent = function(e){
			if (e.originalEvent.touches){
				console.log('touch');
				return [e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY];
				} else {
					console.log('mouse');
					return [e.pageX, e.pageY];
					}
			};
	$.fn.spyglass = function( options ){
		var winWidth = $(window).width(), //I use this so much I might as well only calculate it only once
			settings = $.extend({
				zoom: 4,
				width: winWidth*0.4,
				height: winWidth*0.4,
				xDistance: winWidth*0.05,
				yDistance: winWidth*0.05
				}, options);
		return this.each(function(index, elem){
			$(elem).on(down, function(event){
				$(document).on('scrollstart', false); //disable scrolling during spyglass
				var $this = $(event.target), //this image
			
					bigImage = $('<div class="bigImage accelerate" />').css({	//the enhanced partial image frame
									background: 			'url("' + event.target.src + '") no-repeat left top',
									'background-size':		$this.width()*settings.zoom + 'px ' + $this.height()*settings.zoom + 'px',
									width: 					settings.width, 
									height:					settings.height
								}),
				
					//image borders		
					imgTop = $this.offset().top, 
					imgBottom = imgTop + $this.height(),
					imgLeft = $this.offset().left,
					imgRight = imgLeft + $this.width(),
				
					newPos =	function(a){ //calc position of bigImage
									var newLeft = (a[0]<winWidth-bigImage.width()) ? (a[0] + settings.xDistance) : (a[0] - settings.xDistance - bigImage.width()),
									newTop = (a[1]<bigImage.height()) ? a[1] + settings.yDistance : a[1] - bigImage.height() - settings.yDistance ;
									return {left: newLeft, top: newTop};		
								},
					
					newImgPos =	function(a){ //calc position of bigImage background
									var newLeft = ((a[0] - imgLeft) * settings.zoom) - (bigImage.width()/2),
										newTop = ((a[1] - imgTop) * settings.zoom) - (bigImage.height()/2);
									return -((newLeft>0) ? (newLeft<($this.width()*settings.zoom)-bigImage.width()) ? newLeft : ($this.width()*settings.zoom)-bigImage.width() : 0) + 'px ' + -((newTop<($this.height()*settings.zoom - bigImage.height())) ? (newTop>0) ? newTop : 0 : $this.height()*settings.zoom - bigImage.height())  + 'px';
								}; 
					
					$('body').append(bigImage); //attach bigImage to the view
					bigImage	.offset(newPos(splitEvent(event)))
								.css('background-position', newImgPos(splitEvent(event)));//initial position for bigImage		
					$this	.on(move,function(e){
								bigImage.offset(newPos(splitEvent(e))).css('background-position', newImgPos(splitEvent(e)));})
							.attr('draggable', false); //this is just so the image doesn't drag while I test. 
					$(document).on(up, function(e){
						bigImage.remove(); //remove bigImage
						$this.off(move); //disable move
						$(document).off('scrollstart');
						});
			});
		});
	}
})(jQuery);