
var dayOfWeek = (new Date).getDay();
var downCaret= '<i class="fa fa-caret-down" aria-hidden="true"></i>';

var hours =[ "Closed", //sunday
"10:00am - 5:00pm", //monday
"10:00am - 4:00pm", //Tuesday
"10:00am - 5:00pm", //wednesday
"12:00am - 6:00pm", //thursday
"10:00am - 5:00pm", //Friday
"Closed"];

var days = [
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",
    
]

var todaysHours = hours[dayOfWeek];


$(function(){

    //display for the contact page's hours
  if(todaysHours == "Closed"){
    $('#hoursOfOperation').addClass("closed ").append( downCaret);
      

  }
    $('#hoursOfOperation').html(" " + todaysHours+" "+ downCaret);
    
    /* adds drop down table when the hours are clicked */
    $('#hoursOfOperation').click(function(){
        var $table = $( "<table></table>" );
        
        for( var i= 0; i < hours.length; i++){
            var day = hours[i];
            var dayOfWeek = days[i];
            var $line = $( "<tr></tr>" );
            
            $line.append( $( "<td></td>" ).html( dayOfWeek ) );
            $line.append( $( "<td></td>" ).html( day ) );
            $table.append($line);
            
        }
        
       $("#hours").html(" Hours:");
        
        $('#hoursOfOperation').html($table).removeClass("closed");
        
        
    });

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
