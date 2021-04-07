(function () {
	// Add the click handler for the button
	$(":button").click(function(){
		let val = $('#myInput').val()
		$("#allUpper").append(val.toUpperCase());
		$("#allLower").append(val.toLowerCase());
		$("#redText").append(val);
		$("#redText").css("color","red");
		$("#flashyText").append(val);
		$("#flashyText").addClass("flashy");
	})

})();

