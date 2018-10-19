var mainFunction = (function() {
	var itemCount = 0; // number of sugar tests stored in the local storage
		
	function saveInformation(){ // save information in local storage
		while(document.getElementById("time").value == "" || document.getElementById("date").value == "" || document.getElementById("GlucoseQuantity").value == "")
		{ //check that all required information is inserted
			if(document.getElementById("time").value == "")
			{
				alert("Please enter a valid time!");
				return;
			}
			else if(document.getElementById("date").value == "")
			{
				alert("Please enter a valid date!");
				return;
			}
			else if(document.getElementById("GlucoseQuantity").value == "")
			{
				alert("Please enter a valid Sugar Value!");
				return;
			}
		}
		var time = document.getElementById("time").value; // get time from input
		var date = document.getElementById("date").value; // get date from input
		var notes = document.getElementById("notes").value; // get notes from input
		var quantity = document.getElementById("GlucoseQuantity").value; // get sugar value from input
		var record = new Object();
		record.time = time;
		record.date = date;
		record.notes = notes;
		record.quantity = quantity;
		localStorage.setItem(itemCount, JSON.stringify(record)); // save in local storage
		itemCount++;
		clearTextData(); // clear all input fields
	}

	function clearTextData(){ // clear all input fields
		document.getElementById("time").value = "";
		document.getElementById("date").value = "";
		document.getElementById("notes").value = "";
		document.getElementById("GlucoseQuantity").value = "";
	}

	function showData(){ // show table by dates and by time of day
		$('#SugarData').html("");	// clear table data	
		var k;
		var s;
		var arr = [];
		for(k = 0; k < itemCount; k++) // take info from local storage and push to an array
		{
			var key = localStorage.key( k );
			var item = JSON.parse(localStorage.getItem(key));
			arr.push(item);
		}
		arr.sort(function(a, b){ // sort array by date and by time of day
			if(a.date+a.time > b.date+b.time ) 
				return -1
			else if (a.date+a.time < b.date+b.time)
				return 1 
			else  
				return 0
      	});
		var monthNames = ["January", "February", "March", "April", "May", "June", 
			"July", "August", "September", "October", "November", "December"]; 
		var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
			"Saturday"];
		var addDate;
		var addQuantity;
		var addTime;
		var MyDate;
		var weekDay;
		var Day;
		var Month;
		var Year;
		var row1;
		var row2;
		var row3;
		var col1;
		var col2;
		var col3;
		var MyTime;
		var MyQuantity;
		var MyNotes;
		var isEqual = 0;
		var table = $('<table cellspacing="0" cellpadding="0"></table>'); // create table
		table.addClass('tblBorder');
		for(var s = 0; s < arr.length; s++) 
		{
			MyQuantity = arr[s].quantity;
			MyNotes = arr[s].notes;
			MyTime = arr[s].time;
			if(s == 0 || (s != 0 && arr[s].date != arr[s-1].date))
			{	// if dates are diffrent or first value of the array 
				isEqual = 0;
				MyDate = new Date(arr[s].date);
				weekDay = weekDays[MyDate.getDay()];
				Day = MyDate.getDate();
				Month = monthNames[MyDate.getMonth()];
				Year = MyDate.getFullYear();
								
				// create first row for date information
				row1 = $('<tr></tr>');
				col1 = $('<td></td>');
				addDate = $('<div id="divDateHeader' + s + '">' + weekDay + ',' + Day + '/' + Month + '/' + Year + '</div>');
				addDate.addClass('TableDateStyle');
				col1.append(addDate);
				row1.append(col1);
				table.append(row1);
				
				// create second row for sugar value time and notes
				row2 = $('<tr></tr>');
				col2 = $('<td></td>');
				addInfo = $('<div id="divInfo' + s + '"><span class="MyQuantity">' +  MyQuantity + ' mg/dl</span><span class="MyNotes"> ' +  MyNotes + '</span><br><span class="MyTime">' + MyTime + '</span></div>');
				addInfo.addClass('TableInfoStyle');
				col2.append(addInfo);
				row2.append(col2);
				table.append(row2);
			}
			else if(arr[s].date == arr[s-1].date)
			{	// if the current date and the last date are the same
				// create row for sugar value time and notes
				row2 = $('<tr></tr>');
				col2 = $('<td></td>');
				addInfo = $('<div id="divInfo' + s + '"><span class="MyQuantity">' +  MyQuantity + ' mg/dl</span><span class="MyNotes"> ' +  MyNotes + '</span><br><span class="MyTime">' + MyTime + '</span></div>');
				addInfo.addClass('TableInfoStyle');
				col2.append(addInfo);
				row2.append(col2);
				table.append(row2);
			}
			// add line between rows
			row3 = $('<tr></tr>');
			col3 = $('<td></td>');
			addline = $('<div id ="Breakine" class="breakline"></div>');
			col3.append(addline);
			row3.append(col3);
			table.append(row3);
		}
		$('#SugarData').append(table); 
	}
		
	$("document").ready(function() {
		$("#saveInfo").click(function(){ // save the information when clicking "save"
			saveInformation();
		});
		
		$("#showData").click(function(){ // show saved data from local storage
			showData();
		});
	});	
	
}());



