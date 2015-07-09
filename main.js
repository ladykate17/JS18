$(document).on('ready', function() {
  
var AllQuotes = []
var quoteId = 1;

var Quote = function(quote, author){
	this.quote 	= quote;
	this.author = author;
	this.rating = 0;
	this.id = quoteId++;
	AllQuotes.push(this);


}


	$('#submit').on('click', function(){

		

		var q = $('#quote').val();
		var a = $('#author').val();


		var setQuote = new Quote(q, a);

		var $quoteBlock = $('<div class="quote-block" data-id="' + setQuote.id + '"><p class="quote-text"></p><p class="author"></p><i class="rate fa fa-star fa-lg" data-rating="1"></i><i class="rate fa fa-star fa-lg" data-rating="2"></i><i class="rate fa fa-star fa-lg" data-rating="3"></i><i class="rate fa fa-star fa-lg" data-rating="4"></i><i class="rate fa fa-star fa-lg" data-rating="5"></i><a href="#" class="remove">remove this quote</a></div>');

		$('input').val('');
		$('.container').append($quoteBlock);
		$('.quote-text').last().append(q);
		$('.author').last().append('-' + ' ' + a);

		// console.log(setQuote)

	// console.log(AllQuotes);
	});


	$('.container').on('click', '.remove', function(event){ // delegated an event to the parent div and moved the intended class to the 2nd arg 
		event.preventDefault();
		$(this).parent().fadeOut(1000);

		setTimeout(function(){

			$('.undo').fadeIn(500);

			$('.redo').on('click', function(){
				
				// console.log( ('Clicked! What!!') );
				$('.undo').fadeOut(500);
				$('.quote-block').fadeIn(500);
			})

			setTimeout(function(){
				$('.undo').fadeOut(500);
				// add some logic to remove 'this' .quote-block on undo click handler?
			}, 5000);

		}, 500);

	});

	// rating
	$(document).on('click', '.rate', function(){

		var $rating = this.getAttribute('data-rating'); //get attr value of data-id from star icon
		var dataID = $(this).closest('.quote-block').data('id'); // figure out which quote the user is rating by key property id

		// set the rating property value to $rating

		// var result = _.find(AllQuotes, dataID)
		console.log('var rating: ', $rating)
		console.log('block id: ', dataID) // I'll use this later to do a "random quote"

		var result = AllQuotes.sort(function(a, b) { // sort the object in order of rating
			return a.rating - b.rating
		});

		console.log(AllQuotes);

	});


	$(document).on('mouseover', '.rate', function(){
		$(this).prevAll('.rate').andSelf().addClass('rate-hover');
	})

	$(document).on('mouseleave', '.rate', function(){
		$(this).nextAll().andSelf().removeClass('rate-hover');
	})




});