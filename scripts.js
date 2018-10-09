var notTheOnionData = [];
var theOnionData = [];

var theData = [];
var gameData = [];

var currentArticle = 0;
var score = 0;
var scoreboard = [];


function getRedditNotTheOnionData(){

	var redditNotTheOnionURL = "https://www.reddit.com/r/nottheonion/.json?limit=50";

	console.log("About to make reddit request...");
	$.ajax({
		url: redditNotTheOnionURL,
		type: 'GET',
		dataType: 'json',
		error: function(err){
			console.log(err);
		},
		success: function(data){

			console.log("WooHoo!");

			notTheOnionData = data.data.children;

			getRedditTheOnionData();

		}
	});
	console.log("Waiting...");
}


function getRedditTheOnionData(){

	var redditTheOnionURL = "https://www.reddit.com/r/theonion/.json?limit=50";

	console.log("About to make reddit request...");
	$.ajax({
		url: redditTheOnionURL,
		type: 'GET',
		dataType: 'json',
		error: function(err){
			console.log(err);
		},
		success: function(data){

			$('#headline').html('');

			$('#button1').show();
			$('#button2').show();

			console.log("WooHoo!");

			theOnionData = data.data.children;

			theData = notTheOnionData.concat(theOnionData);
			shuffleArray(theData);


			for (var i = 0; i < 10; i++){
				gameData[i] = theData[i];
			}
			startGame();

		}
	});
	console.log("Waiting...");
}

function startGame() {
	$('#headline').html(gameData[currentArticle].data.title);
	$('#score').html("Headline " + (currentArticle + 1) + " / 10");


	$('#button1').unbind().click(function(){
		if (gameData[currentArticle].data.subreddit == "TheOnion") {
			score +=1;
			scoreboard[currentArticle] = 1;
			currentArticle += 1;
		}
		else {
			scoreboard[currentArticle] = 0;
			currentArticle += 1;
		}

		if (currentArticle < 10) 
			startGame();
		else {
			$('#headline').html("");
			$('#score').html("");
			$('#button1').hide();
			$('#button2').hide();

			getGiphyData();
		}
	});

	$('#button2').unbind().click(function(){
		if (gameData[currentArticle].data.subreddit == "nottheonion") {
			scoreboard[currentArticle] = 1;
			score += 1;
			currentArticle += 1;
		}
		else {
			scoreboard[currentArticle] = 0;
			currentArticle += 1;
		}

		if (currentArticle < 10) 
			startGame();

		else {
			$('#headline').html("");
			$('#score').html("");
			$('#button1').hide();
			$('#button2').hide();
			getGiphyData();
		}
	});
}


function getGiphyData(response){

	var giphySearchTerm = "";
	var giphyKey = "wSxvvDnmhNKK6CV0mAHvUAcC8O5ETNza";


	if (score >= 0 && score < 3){
		giphySearchTerm += "crying";
	}

	else if (score >= 3 && score < 6){
		giphySearchTerm += "sad";
	}
	
	else if (score >= 6 && score < 10){
		giphySearchTerm += "happy";
	}
	else if (score == 10) {
		giphySearchTerm += "Excellent!";
	}

	var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" + giphySearchTerm + "&api_key=" + giphyKey + "&limit=50";

	console.log("About to make GIPHY request...");
		$('#button3').show();


	$.ajax({
		url: giphyURL,
		type: 'GET',
		dataType: 'json',
		error: function(err){
			console.log(err);
		},
		success: function(data){

			gifArray = data.data;
			shuffleArray(gifArray); 

			var gifImgURL = gifArray[0].images.fixed_width.url;


			var htmlString = "<img src=" + gifImgURL + ">";
			var finals = "<h2> hui </h2>";
			$('#headline').html(htmlString);


	if (score >= 0 && score < 3){
		giphySearchTerm += "crying";
		$('#final').append("You got " + score + " out of 10 correct :( </br> Better luck next time! </br>");

		$('#show-score').html('<button id = "button3"> Show Full Results! </button>');
		$('#try-again').html('<form action="./index.html" target="_blank"> <button id = "button6"> Try Again </button>');


		$('#button3').unbind().click(function(){

				$('#show-score').html("");
				$('#final').html("");
				$('#headline').html("");
				$('#links').append(' <b> So was it </b> <button id = "button7"> The Onion </button> or <button id = "button8"> Not The Onion </button> ? </br> </br>');

				for (var i = 0; i < 10; i++){
					if (gameData[i].data.subreddit == "nottheonion")
						$('#links').append('<form action="' + gameData[i].data.url + '" > <button id = "button4">' + gameData[i].data.title + '</button>');
					else
						$('#links').append('<form action="' + gameData[i].data.url + '" > <button id = "button5">' + gameData[i].data.title + '</button>');

					$('#links').append('<br>');
				}
		});


	}

	else if (score >= 3 && score < 6){
		giphySearchTerm += "sad";
		$('#final').append("You got " + score + " out of 10 correct</br> Not bad, but you can do better! </br>");
		
		$('#show-score').html('<button id = "button3"> Show Full Results! </button>');
		$('#try-again').html('<form action="./index.html" target="_blank"> <button id = "button6"> Try Again </button>');

		$('#button3').unbind().click(function(){

				$('#show-score').html("");
				$('#final').html("");
				$('#headline').html("");
				$('#links').append(' <b> So was it </b> <button id = "button7"> The Onion </button> or <button id = "button8"> Not The Onion </button> ? </br> </br>');


				for (var i = 0; i < 10; i++){
					if (gameData[i].data.subreddit == "nottheonion")
						$('#links').append('<form action="' + gameData[i].data.url + '" > <button id = "button4">' + gameData[i].data.title + '</button>');
					else
						$('#links').append('<form action="' + gameData[i].data.url + '" > <button id = "button5">' + gameData[i].data.title + '</button>');

					$('#links').append('<br>');
				}
		});


	}
	
	else if (score >= 6 && score < 10){
		giphySearchTerm += "happy";
		$('#final').append("You got " + score + " out of 10 correct! </br> Look at You! </br>");

		$('#show-score').html('<button id = "button3"> Show Full Results! </button>');
		$('#try-again').html('<form action="./index.html" target="_blank"> <button id = "button6"> Try Again </button>');

		$('#button3').unbind().click(function(){

				$('#show-score').html("");
				$('#final').html("");
				$('#headline').html("");
				$('#links').append(' <b> So was it </b> <button id = "button7"> The Onion </button> or <button id = "button8"> Not The Onion </button> ? </br> </br>');

				for (var i = 0; i < 10; i++){
					if (gameData[i].data.subreddit == "nottheonion")
						$('#links').append('<form action="' + gameData[i].data.url + '" > <button id = "button4">' + gameData[i].data.title + '</button>');
					else
						$('#links').append('<form action="' + gameData[i].data.url + '" > <button id = "button5">' + gameData[i].data.title + '</button>');

					$('#links').append('<br>');
				}
			});

	}
	else if (score == 10) {
		giphySearchTerm += "Excellent!";
		$('#final').append("You got a perfect score! Congratulations on having such amazing media literacy! </br>");

		$('#show-score').html('<button id = "button3"> Show Full Results! </button>');
		$('#try-again').html('<form action="./index.html" target="_blank"> <button id = "button6"> Try Again </button>');

		$('#button3').unbind().click(function(){

				$('#show-score').html("");
				$('#final').html("");
				$('#headline').html("");
				$('#links').append(' <b> So was it </b> <button id = "button7"> The Onion </button> or <button id = "button8"> Not The Onion </button> ? </br> </br>');

				for (var i = 0; i < 10; i++){
					if (gameData[i].data.subreddit == "nottheonion")
						$('#links').append('<form action="' + gameData[i].data.url + '" > <button id = "button4">' + gameData[i].data.title + '</button>');
					else
						$('#links').append('<form action="' + gameData[i].data.url + '" > <button id = "button5">' + gameData[i].data.title + '</button>');

					$('#links').append('<br>');
				}
			});

	}


		}
	});
	console.log("Waiting...");
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

$('button').on('click',function(){
  console.log("click");
});


$(document).ready(function(){
	console.log("The document is ready!");
	$('#button1').hide();
	$('#button2').hide();
	taketheQuiz();

});

function taketheQuiz() {
	$('#headline').html('<button id = "button0"> Take The Quiz! </button>');

	$('#button0').unbind().click(function(){
		getRedditNotTheOnionData();

		$('#button0').hide();
		$('#headline').html('Loading your quiz...');
	});

}