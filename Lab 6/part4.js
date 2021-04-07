(function () {
	var resources = "http://students.engr.scu.edu/~adiaztos/resources/";

	// Load sample1.php
	$("#sample1").load(resources + "sample1.php");
	// Load sample2.php
	$("#sample2").load(resources + "sample2.php");
	// Get sample3.php
	$.get(resources + "sample3.php", function(data){
		const response = JSON.parse(data);
		const ul = $("<ul></ul>");
		
		$.each(response.friends, function(data){
			const li = $("<li></li>");
			$(li).append(response.friends[data].name);
			$(ul).append(li);
			console.log(response.friends[data].name);
		});
		$("#sample3").append(ul);
	
	})

})();
