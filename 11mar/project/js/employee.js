// Initialize Firebase
var config = {
    apiKey: "AIzaSyC3FFd8_xaYlgyXpKkw_R5oRclj-2q9xaA",
    authDomain: "fir-19dee.firebaseapp.com",
    databaseURL: "https://fir-19dee.firebaseio.com",
    storageBucket: "fir-19dee.appspot.com",
    messagingSenderId: "384275803534"
};
  
firebase.initializeApp(config);
//to empty all fields
function doEmpty(){
	// $('#eName').empty();
	// $('#eRole').empty();
	// $('#startDate').empty();
	// $('#monthlyRate').empty();
	$('#myForm')[0].reset();	
}
//init database firebase
var database = firebase.database();
var monthWork = "demo";
var totalBill = 4000;
// var d = new Date();
// var todaysDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
// var milliseconds  = Date.parse(new Date());
// console.log(milliseconds);
//console.log(todaysDate);
//get values on click submit
$("#addEmployee").on("click", function(event) {
	//alert("inside submit");
	event.preventDefault();
	var eName = $('#eName').val().trim();
	var eRole = $('#eRole').val().trim();
	var startDate = $('#startDate').val().trim();
	var monthlyRate = $('#monthlyRate').val().trim();
	
	//var convertedDate = moment(new Date(startDate));
	//console.log(convertedDate);
	//alert(eName+" | "+eRole+" | "+startDate+" | "+monthlyRate);
//save into firebase
	database.ref().push({
	    eName : eName,
	    eRole : eRole,
	    startDate : startDate,
	    monthlyRate : monthlyRate,
	    dateAdded : firebase.database.ServerValue.TIMESTAMP
  	});
  	//need to empty all fields after submit
	doEmpty();
});
//get values from database
database.ref().on("child_added", function(childSnapshot){
	var obj = childSnapshot.val();
	var months = moment().diff(moment(obj.startDate), "months");
	totalBill = months * obj.monthlyRate;
	console.log(totalBill);

	$('#myTable tr:last').after('<tr><td>'+ obj.eName +'</td><td>'+ obj.eRole +'</td><td>'+ obj.startDate +'</td><td>'+ months +'</td><td>'+ "$"+obj.monthlyRate +'</td><td>'+ "$"+totalBill +'</td></tr>');



}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added",function(snapshot){
// 	var obj = snapshot.val();
// 	var months = moment().diff(moment(obj.startDate), "months");
// 	totalBill = months * obj.monthlyRate;
// 	console.log(totalBill);

// 	$('#myTable tr:last').after('<tr><td>'+ obj.eName +'</td><td>'+ obj.eRole +'</td><td>'+ obj.startDate +'</td><td>'+ months +'</td><td>'+ "$"+obj.monthlyRate +'</td><td>'+ "$"+totalBill +'</td></tr>');
// });

