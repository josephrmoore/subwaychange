jQuery(document).ready(function($){
	var ticketPrice = 250;
	var bonusPercent = 0.05;
	var cardOptions = [900, 1900, 3900];
	
	function getRidesRemainder(balance, ticket){
		var rides = parseInt(balance/ticket);
		var remainder = balance-(rides*ticket);
		return [rides, remainder];			
	}
	
	function getNewCardPrice(rides, ticket, bonus){
		var actual = parseInt((ticket*rides)-(bonus*ticket*rides));
		while(actual%5 != 0 || actual%10 != 0){
			actual += 1;
		}
		return actual;
	}
	
//	console.log(getNewCardPrice(4, ticketPrice, bonusPercent));
	
	$('#new_rides').change(function(){
		var rides = $(this).val();
		$('#new_cost').html((getNewCardPrice(rides, ticketPrice, bonusPercent)/100).toFixed(2));
	});
	
	$('#refill_1_value').change(function(){
		var balance = $(this).val();
		if(getRidesRemainder(balance*100, ticketPrice)[1]==0){
			$('#refill_1_form .exact').removeClass('off');
			$('#refill_1_form .not-exact').addClass('off');
		} else {
			$('#refill_1_form .exact').addClass('off');
			$('#refill_1_form .not-exact').removeClass('off');			
		}
		$('#refill_1_exact_rides').html(getRidesRemainder(balance*100, ticketPrice)[0]);
		$('#refill_1_not-exact_rides').html(getRidesRemainder(balance*100, ticketPrice)[0]);
		$('#refill_1_not-exact_remainder').html((getRidesRemainder(balance*100, ticketPrice)[1]/100).toFixed(2));
	});

});