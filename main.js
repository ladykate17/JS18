$(document).on('ready', function() {
  
  // var removeQuote = null;
  // var undo = null;

	$('#submit').on('click', function(){

		var $quoteBlock = $('<div class="quote-block"><p class="quote-text"></p><p class="author"></p><i class="rate fa fa-star fa-lg"></i><i class="rate fa fa-star fa-lg"></i><i class="rate fa fa-star fa-lg"></i><i class="rate fa fa-star fa-lg"></i><i class="rate fa fa-star fa-lg"></i><a href="#" class="remove">remove this quote</a></div>');
		
		var q = $('#quote').val();
		var a = $('#author').val();

		$('input').val('');
		$('.container').append($quoteBlock);
		$('.quote-text').last().append(q);
		$('.author').last().append('-' + ' ' + a);

		// console.log(q)

	});


	$('.container').on('click', '.remove', function(event){ // degated an event to the parent div and moved the intended class to the 2nd arg 
		event.preventDefault();
		$(this).parent().fadeOut(1000);

		setTimeout(function(){

			$('.undo').fadeIn(500);

			$('.redo').on('click', function(){
				
				// console.log( ('BAM!') );
				$('.undo').fadeOut(500);
				$('.quote-block').fadeIn(500);

			})

			setTimeout(function(){
				$('.undo').fadeOut(500);
				$('.quote-block').remove()
			}, 5000);

		}, 500);

	});


	$('.rate').on('mouseover', function(){
		$(this).addClass('rate-hover').prevAll();
	})

	$('.rate').on('mouseleave', function(){
		$(this).nextAll().removeClass('rate-hover');
	})




});