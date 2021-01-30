var price = 100; //price
var ticketCount = 0


class Seats {
	constructor() {

	}
}



$(document).ready(function () {
	var $cart = $('#selected-seats'), //Sitting Area
		$counter = $('#counter'), //Votes
		$total = $('#total'); //Total money
	var sc = $('#seat-map').seatCharts({
		map: [ //Seating chart
			'aaaaaaaaaa',
			'aaaaaaaaaa',
			'__________',
			'aaaa__aa__',
			'aaaa__aaaa',
			'aaaa__aaaa',
			'aaaa__aaaa',
			'aaaa__aaaa',
			'aaaa__aaaa',
			'__________',
			'aaaa__aa__',
			'aaaa__aaaa',
			'aaaa__aaaa',
			'aaaaaaaaaa',
		],
		naming: {
			top: false,
			getLabel: function (character, row, column) {
				return column;
			}
		},
		legend: { //Definition legend
			node: $('#legend'),
			items: [
				['a', 'available', 'Available'],
				['a', 'unavailable', 'Unavailable']
			]
		},
		click: function () { //Click event
			if (this.status() == 'available') { //optional seat
				if (ticketCount > 3) {
					alert("Maximum 4 tickets only")
					return 'available'
				}
				$('<li>R' + (this.settings.row + 1) + '-S' + this.settings.label + ' ' + '</li>')
					.attr('id', 'cart-item-' + this.settings.id)
					.data('seatId', this.settings.id)
					.appendTo($cart);
				$counter.text(sc.find('selected').length + 1);
				$total.text(recalculateTotal(sc) + price);
				ticketCount++;
				return 'selected';
			} else if (this.status() == 'selected') { //Checked
				//Update Number
				$counter.text(sc.find('selected').length - 1);
				//update totalnum
				$total.text(recalculateTotal(sc) - price);

				//Delete reservation
				$('#cart-item-' + this.settings.id).remove();
				ticketCount--;
				//optional
				return 'available';
			} else if (this.status() == 'unavailable') { //sold
				return 'unavailable';
			} else {
				return this.style();
			}
		}
	});
	//sold seat

	class Reserverd {
		constructor() {
			this.seatsBlocked = ['1_1', '1_2', '1_3', '1_8', '1_9', '1_10', '2_1', '2_2', '2_3', '2_4', '2_5', '2_6', '2_7', '2_8', '2_9', '2_10', '4_1', '4_2', '4_3', '4_4', '4_7', '4_8', '8_1', '8_2', '8_3', '8_4', '8_5', '8_6', '8_7', '8_8', '8_9', '8_10', '9_1', '9_2', '9_3', '9_4', '9_5', '9_6', '9_7', '9_8', '9_9', '9_10', '11_1', '11_2', '11_3', '11_4', '11_7', '11_8', '14_1', '14_2', '14_3', '14_4', '14_5', '14_6', '14_7', '14_8', '14_9', '14_10'];
		}

		generateTicket() {
			var info = document.getElementById("info");

			var h1tagMovie=document.createElement("h1")
			h1tagMovie.innerHTML="KGF Chapter-2"

			var ptagTheater = document.createElement("p")
			ptagTheater.innerHTML = "Theater Chaitanya Ganesh"

			var ptagShow=document.createElement("p")
			ptagShow.innerHTML="Show: OCT 24-Morning 11:30"

			var ptagSeats=document.createElement("p")
			ptagSeats.id="seats"


			var poster=document.getElementById("inner-poster")
			poster.setAttribute("src", "poster.jpg");
			info.appendChild(h1tagMovie)
			info.appendChild(ptagTheater)
			info.appendChild(ptagShow)
			info.appendChild(ptagSeats)
		}
	}

	class General {
		constructor() {
			this.seatsBlocked = ['1_4', '1_5', '1_6', '1_7', '5_1', '5_2', '5_3', '5_4', '5_7', '5_8', '5_9', '5_10', '6_1', '6_2', '6_3', '6_4', '6_7', '6_8', '6_9', '6_10', '7_1', '7_2', '7_3', '7_4', '7_7', '7_8', '7_9', '7_10', '12_1', '12_2', '12_3', '12_4', '12_7', '12_8', '12_9', '12_10', '13_1', '13_2', '13_3', '13_4', '13_7', '13_8', '13_9', '13_10'];
		}
		generateTicket() {
			var info = document.getElementById("info");
			var ptag = document.createElement("p")
			ptag.innerHTML = "Ticket(s) has been successfully booked"

			var h3tag = document.createElement("h3")
			h3tag.innerHTML = "Show this QR Code at Box Office to collect the tickets"

			var poster=document.getElementById("inner-poster")
			poster.setAttribute("src", "qrcode.webp");
			info.appendChild(ptag)
			info.appendChild(h3tag)
		}
   
	}

	var generalSeats = new General();
	var reservedSeats = new Reserverd()

	var flag = 0;
	sc.get(generalSeats.seatsBlocked).status('unavailable');

	$('#mycheckbox').on('change', function () { // on change of state
		if (this.checked) // if changed state is "CHECKED"
		{
			sc.get(reservedSeats.seatsBlocked).status('unavailable');
			sc.get(generalSeats.seatsBlocked).status('available');
			$("#selected-seats").children().remove();
			flag = 1
		} else {
			sc.get(generalSeats.seatsBlocked).status('unavailable');
			sc.get(reservedSeats.seatsBlocked).status('available');
			$("#selected-seats").children().remove();
			flag = 0
		}
		ticketCount = 0;
	})

	$(".checkout-button").click(function () {
		if ($("#selected-seats").children().length == 0)
			alert("Please select seats")
		else {
			if (flag ==0) {
				generalSeats.generateTicket();
			}
			else{
				reservedSeats.generateTicket()
			}

			$("#seats").text('Seats: ' + $("#selected-seats").children().text())
			$(".ticket").css('visibility', 'visible');
		}
	});

	$(".close-button").click(function () {
		$(".ticket").css('visibility', 'hidden');
		$("#info").empty()
	});

});
//sum total money
function recalculateTotal(sc) {
	var total = 0;
	sc.find('selected').each(function () {
		total += price;
	});

	return total;
}