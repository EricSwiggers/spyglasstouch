// JavaScript Document

var down = 'touchstart',
	move = 'touchmove',
	up = 'touchend';
	
(function($){
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
				
					newPos =	function(xPos, yPos){ //cac position of bigImage
									var newLeft = xPos + settings.xDistance,
									newTop = yPos - bigImage.height() - settings.yDistance;
									return {left: newLeft, top: newTop};		
								},
					
					newImgPos =	function(xPos, yPos){ //calc position of bigImage background
									var newLeft = ((xPos - imgLeft) * settings.zoom) - (bigImage.width()/2),
										newTop = ((yPos - imgTop) * settings.zoom) - (bigImage.height()/2);
									return -((newLeft>0) ? newLeft : 0) + 'px ' + -((newTop<($this.height()*settings.zoom - bigImage.height())) ? newTop : $this.height()*settings.zoom - bigImage.height()) + 'px';
								}; 
					
					$('body').append(bigImage); //attach bigImage to the view
					bigImage	.offset(newPos(event.originalEvent.touches[0].pageX, event.originalEvent.touches[0].pageY))
								.css('background-position', newImgPos(event.originalEvent.touches[0].pageX, event.originalEvent.touches[0].pageY));//initial position for bigImage		
					$this	.on(move,function(e){
								bigImage.offset(newPos(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY)).css('background-position', newImgPos(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY));})
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

$(document).ready( function(event){
	$('.spyglass').spyglass();
	});