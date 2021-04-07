(function () {
	const resources = "http://students.engr.scu.edu/~adiaztos/resources/";
	const template = document.getElementById("template");

	// remove template from the page, since it is only a template
	const parent = template.parentNode;
	parent.removeChild(template);

	// Create an XMLHttpRequest object
	const xhttp = new XMLHttpRequest();
	// Set onreadystatechange
	xhttp.onreadystatechange = function (){
		if(this.readyState == 4 && this.status == 200){
			const response = JSON.parse(this.responseText);
			populateContacts(response);
		}
	}
	// Open and send requests
	xhttp.open("GET", resources + "contacts.php", true)
	xhttp.send();
	// This function takes the list of contacts and clones a new element from the template with the value of each contact
	function populateContacts(contacts) {
		for (let i = 0; i < contacts.length; i++) {
			
			const node = template.cloneNode(true);
			node.id = contacts[i].id;
			node.querySelectorAll("#index").value = i;
			node.querySelectorAll("input[name='name']")[0].value = contacts[i].name;
			node.querySelectorAll("input[name='email']")[0].value = contacts[i].email;

			parent.append(node);
		}
	}

	// submits a request with the search query for the filtered list of contacts
	function search() {
		// clear the current contacts list
		while (parent.lastChild)
			parent.removeChild(parent.lastChild);
		
		val = document.getElementById("searchField").value;

		xhttp.open("POST", "http://students.engr.scu.edu/~adiaztos/resources/contacts.php?query=" + val, true);
		xhttp.send();
	}

	// assign the search function as the click handler for search button
	document.getElementById("searchBtn").addEventListener("click", search);

})();