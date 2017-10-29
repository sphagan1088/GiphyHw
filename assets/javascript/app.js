// Before you can make any part of our site work, you need to create an array of strings, each one 
//related to a topic that interests you. Save it to a variable called topics.
// We chose animals for our theme, but you can make a list to your own liking.
// Your app should take the topics in this array and create buttons in your HTML.
// Try using a loop that appends a button for each string in the array.
// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// Under every gif, display its rating (PG, G, so on).
// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.
// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.
// Deploy your assignment to Github Pages.
// Rejoice! You just made something really cool.


//array of Nintendo characters that will be used to create buttons
var topics = ["Mario", "Luigi", "Donkey Kong", "Bowser", "Yoshi", "Link"];

function displayGifs() {
	var ninCharacter = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ninCharacter + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {



		var results = response.data;

		$("#gifs-view").empty();


		for(var i = 0; i < results.length; i++) {

		
		var nintendoDiv = $("<div class='item'>");
		console.log(nintendoDiv);

		var rating = results[i].rating;

		var p = $("<p>").text("Rating:" + rating);

		var gifImage = $("<img>");

		gifImage.attr("src", results[i].images.fixed_height_still.url);
		gifImage.attr("data-still", results[i].images.fixed_height_still.url);
		gifImage.attr("data-animate", results[i].images.fixed_height.url);
		gifImage.attr("data-state", "still");
		gifImage.addClass("images");


		nintendoDiv.prepend(p);
		
		nintendoDiv.prepend(gifImage);

		

		$("#gifs-view").prepend(nintendoDiv);

		console.log(response);
		console.log(queryURL);
	}
	})
}




//function to render buttons 
function renderButtons() {

	//deletes buttons when adding new ones
	$("#buttons-view").empty();

	//loop for the array 
	for(var i = 0; i < topics.length; i++) {

		//creates buttons
		var a = $("<button type='button' class='btn btn-primary btn-md'>");

		a.addClass("ninCharacter");

		a.attr("data-name", topics[i]);

		a.text(topics[i]);

		$("#buttons-view").append(a);
	}
}

$("#add-nintendo").on("click", function(event) {

	event.preventDefault();

	var ninCharacter = $("#nintendo-input").val().trim();

	topics.push(ninCharacter);

	renderButtons();
})

$(document).on("click", ".ninCharacter", displayGifs);
$(document).on("click", ".images", function() {

		var state = $(this).attr("data-state");

		if( state === "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}
	})


renderButtons();

