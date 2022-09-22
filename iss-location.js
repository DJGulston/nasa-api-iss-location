// require() method commented out in order for the iss-location.js to work in the browser.
//require('isomorphic-fetch');

fetch("http://api.open-notify.org/iss-now.json")
	.then(res => res.json())
	.then(result => {
		
			// Retrieves the latitude, longitude and timestamp for the ISS location.
			let latitude = result.iss_position.latitude;
			let longitude = result.iss_position.longitude;
			let iss_timestamp = result.timestamp;
			
			// Create a date object using the unix timestamp.
			let iss_date = new Date(iss_timestamp * 1000);
			
			// Formats the date and time in South African English format.
			let formatted_date = iss_date.toLocaleDateString("en-ZA");
			let formatted_time = iss_date.toLocaleTimeString("en-ZA");
			
			// Determines the current timezone.
			let timezoneoffset = iss_date.getTimezoneOffset() / -60;
			
			let formatted_timezone = "";
			
			// Formats the timezone as a GMT format.
			if(timezoneoffset >= 0) {
				formatted_timezone = "GMT+" + timezoneoffset;
			}
			else {
				formatted_timezone = "GMT-" + timezoneoffset;
			}
			
			// Concatenates the date, time and timezone.
			let formatted_iss_date = formatted_date + " " + formatted_time + " (" + formatted_timezone + ")";
			
			// Displays the latitude, longitude and date on the webpage.
			document.getElementById("latitude").innerHTML = "<h3>Latitude</h3><p>" + latitude + "</p>";
			document.getElementById("longitude").innerHTML = "<h3>Longitude</h3><p>" + longitude + "</p>";
			document.getElementById("datetime").innerHTML = "<h3>Date</h3><p>" + formatted_iss_date + "</p>";
		},
		
		error => {
			// Error displays if JSON text cannot be retrieved.
			console.log(error);
		}
	);
	
/*

References:

How to convert unix timestamp to datetime object:
- https://www.w3schools.com/js/js_dates.asp
- https://www.w3schools.com/js/js_date_methods.asp-
- https://www.codeinwp.com/snippets/convert-unix-time-to-date-with-javascript/
- https://www.tutorialrepublic.com/faq/how-to-convert-a-unix-timestamp-to-time-in-javascript.php

How to format a date object in JavaScript using toLocaleDateString() and toLocaleTimeString():
- https://stackoverflow.com/questions/2388115/get-locale-short-date-format-using-javascript

How to get current timezone in JavaScript:
- https://attacomsian.com/blog/javascript-current-timezone

*/