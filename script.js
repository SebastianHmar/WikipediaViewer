$(function() {
	// $("button[type='submit']").on("click", function() {
	// 	searchWiki();
	// });
	// $("input[type='text']").keypress(function(e) {
	// 	if (e.which === 13) {
	// 		searchWiki();
	// 	}
	// });


	// When submit/search button is clicked
	$("button[type='submit']").on("click", function() {
		if($("input[type='text']").val() === "") {
			alert("Your search box is empty!");
		} else {
			searchWiki();		
		}

	});

	// If user presses enter
	$("input[type='text']").keypress(function(e) {
		if (e.which === 13) {
			$("button[type='submit']").click(); // Run the above click event when enter is pressed
		}
	});

	// To remove all searched articles by event delegation as span was added dynamically
	$(".wikiSearch").on("click", "#close", function() {
		$(".wikiSearch").fadeOut();
	});

  // Search function to search articles
	function searchWiki() {
		$(".wikiSearch").fadeOut().html("");
		var search = $("input[type='text']").val();
		var limit = $("input[type='number']").val();
		if (limit < 1 || limit > 10) {
			alert("Only 1-10 articles allowed!");
		} else {
			$.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=" + search + "&callback=?&limit=" + limit)
				.done(function(data) {
					var rawJson = JSON.stringify(data);
				  var json = JSON.parse(rawJson);
				  if(json[1].length === 0) {
				  	alert("No such records found!");
				  } else {
				  	$(".wikiSearch").html("<span id='close'>X</span>")
				  	for (var i = 0, len = json[1].length; i < len; i++) {
				  		$(".wikiSearch").append("<a href='" + json[3][i] + "' target='_blank'><div class='article'><h3>" + json[1][i] + "</h3><p>" + json[2][i] + "</p></div></a>").fadeIn();
				  	}
				  }
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					alert("The API call couldn't be made!");
				});
			}
		}
});





