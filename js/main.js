
var dayOfWeek = (new Date).getDay();

var hours =[ "Closed", //sunday
"10:00am - 5:00pm", //monday
"10:00am - 4:00pm", //Tuesday
"10:00am - 5:00pm", //wednesday
"12:00am - 6:00pm", //thursday
"10:00am - 5:00pm", //Friday
"Closed"];

var todaysHours = hours[dayOfWeek];


$(function(){

    //display for the contact page's hours
  if(todaysHours == "Closed"){
    $('#hoursOfOperation').addClass("closed");

  }
    $('#hoursOfOperation').html(" " + todaysHours);


  //gets the carousel going!! (its provacative)
  $('.carousel').carousel({
      interval: 5000 //changes the speed
  });
    
    

    

//TODO: fix animations
$("#headerAnimated").on("click", function(){
  console.log("this worked");
  $("#headerAnimated").addClass("animated bounceIn");
  $('#headerAnimated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $("#headerAnimated").removeClass("animated bounceIn");
});

});




});//end of doc ready
