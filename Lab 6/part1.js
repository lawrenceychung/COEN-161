(function () {
	const resources = "http://students.engr.scu.edu/~adiaztos/resources/";
	
	// Create an XMLHttpRequest object
	const xhttp = new XMLHttpRequest();
	
	// Handle succesful responses
	xhttp.onreadystatechange = function (){
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("sample1").innerHTML = this.responseText;
		}
	}
	// Get sample1.php
	xhttp.open("GET", resources + "sample1.php", true)
	xhttp.send();


	// Create an XMLHttpRequest object
	const qhttp = new XMLHttpRequest();
	// Handle succesful responses
	qhttp.onreadystatechange = function (){
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("sample2").innerHTML = this.responseText;
		}
	}
	// Get sample2.php
	qhttp.open("GET", resources + "sample2.php", true)
	qhttp.send();

	// Create an XMLHttpRequest object
	const whttp = new XMLHttpRequest();
	// Handle succesful responses
	whttp.onreadystatechange = function (){
		if(this.readyState == 4 && this.status == 200){
			const response = JSON.parse(this.responseText);
			let ul = document.createElement('ul');
			
			for (element in response.friends) {
				let li = document.createElement('li');
				li.appendChild(document.createTextNode(response.friends[element].name));
				ul.appendChild(li); 
			}
		
			document.getElementById("sample3").appendChild(ul);
		}
	}
	// Get sample3.php
	whttp.open("GET", resources + "sample3.php", true)
	whttp.send();
})();