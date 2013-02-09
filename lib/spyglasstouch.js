// JavaScript Document

$(document).on('mousedown', '.spyglass', function(event){
	var $this = $(event.target), //this image
	bigImage = $('<div class="bigImage" />').css({width: $(window).width()*0.4, height:$(window).width()*0.4}),//the enhanced partial image frame
	decal = $(window).width()*0.02, //need a standard decal for bigImage
	newPos = function(xPos, yPos){ //clac position of bigImage
		var newLeft = xPos + decal,
			newTop = yPos - bigImage.height() - decal;
		return {left: newLeft, top: newTop};		
		}; 
	$('body').append(bigImage); //attach bigImage to the view
	bigImage.offset(newPos(event.pageX, event.pageY));//initial position for bigImage				
	$this	.on('mousemove', function(e){
				bigImage.offset(newPos(e.pageX, e.pageY));
			})
			.attr('draggable', false); //this is just so the image doesn't drag while I test. 
	$(document).on('mouseup', function(e){
		bigImage.remove(); //remove bigImage
		$this.off('mousemove'); //disable move
	});
});
