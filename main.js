	// localStorage.clear();
var pageState = function(){
	setTimeout(function(){
	$('.container').html(JSON.parse(localStorage["contents"]));
	}, 500);
};

pageState();

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

	// working on some logic here to make even .quote-block divs a med. gray BG color
		// console.log(this.id % 2)
		// 	if ( (this.id % 2) != 0 ){
		// 		$('.quote-block').addClass('.even-block');
		// 	}

	// --- RATING --- //

	$(document).on('click', '#submit', function(){

		var q = $('#quote').val();
		var a = $('#author').val();

		if ( q === ''){
			$('.qt-err').after('<p class="error">Oops, please enter a quote.</p>')
			setTimeout(function(){
				var error = $('.error').fadeOut(4000).remove();
			}, 6000);
		} 

		if ( a === ''){
			$('.auth-err').after('<p class="error">Oops, please enter an author.</p>')
			setTimeout(function(){
				var error = $('.error').fadeOut(4000).remove();
			}, 6000);
		} 
		else {
			var setQuote = new Quote(q, a);

			$('input').val('');
			$('.qt-container').append(setQuote.create());
			$('.quote-text').last().append(q);
			$('.author').last().append('-' + ' ' + a);
		}
		
	localStorage["contents"] = JSON.stringify($('.container').html());
	});

	// --- RANDOM QUOTE --- //

	// // after local storage is implemented this will render upon DOM load
	// // ---- This is working-ish but localStorage is not re-populating AllQuotes var to reference from ---- //
	// var $random = (Math.random() * AllQuotes.length);
	
	// // console.log('random num:', $random);
	// var randomQuoteNum = AllQuotes[$random];
	// // console.log(randomQuoteNum);
	// var randomQuote = $('.random-quote').text(randomQuoteNum.quote + '\n -' + randomQuoteNum.author);
	// // console.log(randomQuote);

	// --- UNDO/REMOVE --- //

	$(document).on('click', '.remove', function(event){ // delegated an event to the parent div and moved the intended class to the 2nd arg 
		event.preventDefault();
		console.log('Clicked!!')
		$(this).parent().fadeOut(1000);

		setTimeout(function(){

			$('.undo').slideDown('slow');

			$('.redo').on('click', function(){
				
				// console.log( ('Clicked! What!!') );
				$('.undo').slideUp('slow');
				$('.quote-block').fadeIn(500);
			})

			setTimeout(function(){
				$('.undo').fadeOut(500);
				$(this).remove();
				// add some logic to remove 'this' .quote-block on undo click handler?
				// $('.quote-block').remove();
			}, 5000);

		}, 500);

	});

	// --- RATING --- //

	// Added star hover events to CSS, may come back to this code if can't fix '.active' class bug
		// $(document).on('mouseover', '.rate', function(){
		// 	$(this).prevAll('.rate').andSelf().addClass('rate-active');
		// })

		// $(document).on('mouseout', '.rate', function(){
		// 	$(this).nextAll().andSelf().removeClass('rate-active');
		// })

	$(document).on('click', '.rate', function(){ 
		// console.log( ('Clicked! What!!') );
		
		// --- BUG - can't rate quotes loaded from localStorage? 
		var $rating = parseInt(this.getAttribute('data-rating')); //get attr value of data-id from star icon
		var dataID = $(this).closest('.quote-block').data('id'); // figure out which quote the user is rating by key property id
		// console.log( (AllQuotes[dataID]).rating );

		(AllQuotes[dataID]).rating = $rating; // set prop key to value of data-rating attr
		// console.log('rating prop: ', (AllQuotes[dataID]).rating);
		

		var result = AllQuotes.sort(function(a, b) { // sort the object in order of rating - decending order
			return b.rating - a.rating
		});

		for (var i=0; i< AllQuotes.length; i++){ // loop over AllQuotes and find QuoteBlock to re-render as needed
			AllQuotes[i].el.appendTo('.qt-container');
		}


		// --- BUG -  when 5th star is clicked, rating is recorded but active class isn't working
		$(this).prev().andSelf().addClass('active').next();

	// console.log(AllQuotes);

	});
	
});