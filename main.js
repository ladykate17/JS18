$(document).on('ready', function() {
  
var AllQuotes = []
var quoteId = 0;

var Quote = function(quote, author){
	this.quote 	= quote;
	this.author = author;
	this.rating = 0;
	this.id = quoteId++;
	this.el = null;
	AllQuotes.push(this);
}

Quote.prototype.create = function(){
	var $quoteBlock = $('<div class="quote-block" data-id="' + this.id + '"><p class="quote-text"></p><p class="author"></p><div class="rating"><span class="star rate" data-rating="5"></span><span class="star rate" data-rating="4"></span><span class="star rate" data-rating="3"></span><span class="star rate" data-rating="2"></span><span class="star rate" data-rating="1"></span></div><a href="#" class="remove">remove this quote</a></div>');

	this.el = $quoteBlock;

	return this.el
}
	// var $random = Math.floor().

	// $('.random-quote').append($random)


	$('#submit').on('click', function(){

		

		var q = $('#quote').val();
		var a = $('#author').val();


		var setQuote = new Quote(q, a);

		$('input').val('');
		$('.qt-container').append(setQuote.create());
		$('.quote-text').last().append(q);
		$('.author').last().append('-' + ' ' + a);

		// console.log(setQuote)

	// console.log(AllQuotes);
	});


	$('.qt-container').on('click', '.remove', function(event){ // delegated an event to the parent div and moved the intended class to the 2nd arg 
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

	// $(document).on('mouseover', '.rate', function(){
	// 	$(this).prevAll('.rate').andSelf().addClass('rate-active');
	// })

	// $(document).on('mouseout', '.rate', function(){
	// 	$(this).nextAll().andSelf().removeClass('rate-active');
	// })

	$(document).on('click', '.rate', function(){
		

		var $rating = parseInt(this.getAttribute('data-rating')); //get attr value of data-id from star icon
		var dataID = $(this).closest('.quote-block').data('id'); // figure out which quote the user is rating by key property id
		// console.log( (AllQuotes[dataID]).rating );

		(AllQuotes[dataID]).rating = $rating; // set prop key to value of data-rating attr
		// console.log('rating prop: ', (AllQuotes[dataID]).rating);
		

		console.log('var $rating: ', $rating)
		// console.log('block id: ', dataID) // use this later to do a "random quote" ?

		var result = AllQuotes.sort(function(a, b) { // sort the object in order of rating - decending order
			return b.rating - a.rating
		});

		for (var i=0; i< AllQuotes.length; i++){ // loop over AllQuotes and find QuoteBlock to re-render as needed
			AllQuotes[i].el.appendTo('.qt-container');
		}



		$(this).prev().addClass('active');

	console.log(AllQuotes);

	});
	





});