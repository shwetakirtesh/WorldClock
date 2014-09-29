
var currentHoursTM, currentMinutesTM, currentSecondsTM=0, clockValueObj;
var oldHours,oldMinutes,oldSeconds;
$(document).ready(function(){
 $("#startButton").click(function(){
   currentHoursTM = $("#hoursInput").val();
   currentMinutesTM = $("#minutesInput").val()-1;
   currentSecondsTM = 59;
   var className = $('#startButton').attr('class');
  	if(className == 'button-start left-button')  //On Start
  	{	
      $('#startButton').removeClass('button-start left-button').addClass('button-stop left-button');
      $('#startButton').text("Cancel");
      $('#timer .inputs').hide();
      $('#timer .counter').show(); 
      $('#PauseButton').attr('disabled', false);
    }
  	else  //Toggle for Start and Cancel
    {
      $('#startButton').removeClass('button-stop left-button').addClass('button-start left-button');
      $('#startButton').text("Start");
      $('#timer .counter').hide();
      $('#timer .inputs').show(); 
      $('#PauseButton').attr('disabled', true);    		 
    }
    
    if(clockValueObj)
    {
     clearTimeout(clockValueObj);
     clockValueObj = null;
   }
   else{
     clockValueObj = setInterval("countDownTimer()",1000);
   }
   
 });

$("#PauseButton").click(function(){  
  
 var className = $('#PauseButton').attr('class');
  	if(className == 'button-pause right-button') //On Pause
  	{
      oldHours = currentHoursTM;
      oldMinutes = currentMinutesTM;
      oldSeconds = currentSecondsTM;
      clearTimeout(clockValueObj);
      clockValueObj = null;
      $('#PauseButton').removeClass('button-pause right-button disabled').addClass('button-resume right-button disabled');
      $('#PauseButton').text("Resume");
      
    }
  	else //Toggle for Pause and Resume
    {
      currentHoursTM = oldHours;
      currentMinutesTM = oldMinutes;
      currentSecondsTM = oldSeconds;
      clockValueObj = setInterval("countDownTimer()",1000);
      $('#PauseButton').removeClass('button-resume right-button disabled').addClass('button-pause right-button disabled');
      $('#PauseButton').text("Pause");
      
    }
  })
})
function countDownTimer()
{
  if ( currentHoursTM==0&& currentMinutesTM==0 && currentSecondsTM == 0)
  {
    clearTimeout(clockValueObj);
  } 
  else if ( currentSecondsTM>0 )
  { 
    currentSecondsTM --;
  }
  else if( currentMinutesTM >0 && currentSecondsTM == 0)
  {
    currentMinutesTM --;
    currentSecondsTM = 59;
  }
  else if( currentHoursTM >0 && currentMinutesTM == 0 && currentSecondsTM == 0)
  {
    currentHoursTM --;
    currentMinutesTM = 59;
    currentSecondsTM = 59;
  }
  
  $('#timer .total-time').text(currentHoursTM+":" +currentMinutesTM+ ":" +currentSecondsTM);
  
}

  //---------------------------------JS for Stopwatch-----------------------------------------//
  
  var i,clockStopWatch,lapStopWatch;
  i = 0;
  SWmiliSeconds_1 = 00;
  SWSeconds_1 = 00;
  SWMinutes_1 = 00;
  lapMiliSeconds_2 = 00;
  lapSeconds_2 = 00;
  lapMinutes_2 = 00;
  lapCount =0;
  
  
  function start(){
   if(clockStopWatch)
   {
     stopLapStopwatch();
     clearTimeout(clockStopWatch);
     clockStopWatch = null;
     document.getElementById("stopwatchID").innerHTML = "00:00:00";
   }
   else
   {
    clockStopWatch = self.setInterval("countUpTimer();",10);
    
  }
  
  
}

function countUpTimer(){
 SWmiliSeconds_1++;
 if(SWmiliSeconds_1 > 99)
 {
  SWmiliSeconds_1 =00;
  SWSeconds_1++;
}
if(SWSeconds_1 > 59)
{
  SWMinutes_1++;
  SWSeconds_1 = 00;
}

if(SWmiliSeconds_1.toString().length < 2)
  SWmiliSeconds_1 = "0" + SWmiliSeconds_1;
if(SWSeconds_1.toString().length < 2)
  SWSeconds_1 = "0" + SWSeconds_1; 
if(SWMinutes_1.toString().length < 2)
  SWMinutes_1= "0" + SWMinutes_1;  			   


document.getElementById("stopwatchID").innerHTML = SWMinutes_1+":"+SWSeconds_1+":"+SWmiliSeconds_1;
}

function resetTime()
{
 lapMiliSeconds_2 = 0;
 lapSeconds_2 = 0;
 lapMinutes_2 = 0;
}
function stopLapStopwatch(){
 
 if(lapStopWatch)
 {
   clearTimeout(lapStopWatch);
   lapStopWatch = null;
   document.getElementById("lapStopWatchID").innerHTML = "00:00:00";
 }
}

function startLapsStopwatch(){
  lapStopWatch = self.setInterval("lapStopWatchcountUpTimer();",10);
  
}

function lapStopWatchcountUpTimer(){
 lapMiliSeconds_2++;
 if(lapMiliSeconds_2 > 99)
 {
  lapMiliSeconds_2 =00;
  lapSeconds_2++;
}
if(lapSeconds_2 > 59)
{
  lapMinutes_2++;
  lapSeconds_2 = 00;
}
if(lapMiliSeconds_2.toString().length < 2)
  lapMiliSeconds_2 = "0" + lapMiliSeconds_2;
if(lapSeconds_2.toString().length < 2)
  lapSeconds_2 = "0" + lapSeconds_2; 
if(lapMinutes_2.toString().length < 2)
  lapMinutes_2 = "0" + lapMinutes_2;  			   


document.getElementById("lapStopWatchID").innerHTML = lapMinutes_2+":"+lapSeconds_2+":"+lapMiliSeconds_2;
}



  $(document).ready(function(){ //Function for Lap Recording
    $("#record-lap").click(function(){
    	lapCount++;
    	resetTime();
      $("#ulLaps").append("<li> <p class=\"lap-label\">Lap" +lapCount+"</p><p class=\"lap-time\">"+$("#stopwatchID").text()+"</p></li>");
      
    });
    
    $("#start-lap").click(function(){
      
      var className = $('#start-lap').attr('class');
      
      if(className == 'button-start left-button')
      {
       startLapsStopwatch();		
       $('#record-lap').attr('disabled', false);
       $('#start-lap').removeClass('button-start left-button').addClass('button-Stop left-button');
       $('#start-lap').text("Stop");
       
     }
     else
     {
      $('#record-lap').attr('disabled', true);
      $('#start-lap').removeClass('button-Stop left-button').addClass('button-start left-button');
      $('#start-lap').text("Start");
      
    }
    
  });
    
    
  });


  function getDestinationTime(destinationOffset)
  {
  	date = new Date();  
      var localOffset = date.getTimezoneOffset() * 60000;   //Local to UTC
      var localTime = date.getTime();
      if (date.getTimezoneOffset())
      {
        date = localTime + localOffset;
      }
      else
      {
        date = localTime - localOffset;
      } 
      date = date+ destinationOffset*60000;
      date = new Date(date);
      
      return date;
    }
    function differenceInHours(destinationOffset)
    {
      var dayTodayTomorrow;
      currentDate = new Date();
      destinationDate = getDestinationTime(destinationOffset);
      if(currentDate.getDay() === destinationDate.getDay())
      {
        dayTodayTomorrow = "<strong>Today</strong>";
        dayTodayTomorrow = "<strong>Today</strong>,";	
      }
      
      else if(currentDate.getDay() < destinationDate.getDay())
        dayTodayTomorrow = "<strong>Tomorrow</strong>,";
      else
       dayTodayTomorrow = "<strong>Yesterday</strong>,";
     
     
     var localOffset = date.getTimezoneOffset() * 60000;
     timeDifference = localOffset+ destinationOffset*60000;
     timeDifference = timeDifference/3600000;
     console.log("Time difference in hours:" + timeDifference);
     
     if(destinationOffset)
       return(dayTodayTomorrow+timeDifference+" hours behind");
     else
       return(dayTodayTomorrow+ timeDifference+" hours ahead");
   }

   function convertLocalDateToUTCDate(destinationOffset) {
    date = getDestinationTime(destinationOffset);
    time = GetAMPMTime(date);
    return time;
  }


  //Function to convert into 12hr format
  function GetAMPMTime(date) {
    var currentTime = (new Date(date))
    var hours = currentTime.getHours()
    var suffix = '';
    if (hours > 11) {
      suffix += "PM";
    } else {
      suffix += "AM";
    }
    var minutes = currentTime.getMinutes()
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
    var time = hours + ":" + minutes + " " + suffix;
    console.log(hours + ":" + minutes + " " + suffix);
    return time;
  }
  //Json Data 
  $(document).ready(function(){
  	var jsonData ="[{\"cityName\": \"Cupertino\",\"timezoneOffset\": -420,\"cityNameId\": \"cupertino\",\"placeholderTime\": \"12:47 PM\",\"placeholderDay\": \"Today\", \"placeholderHours\": \"0\",\"placeholderIsAhead\": true,\"placeholderIsLocalTime\": true},{\"cityName\": \"Stockholm\",\"timezoneOffset\": 120,\"cityNameId\": \"stockholm\",\"placeholderTime\":\"9:47 PM\",\"placeholderDay\": \"Today\", \"placeholderHours\": \"9\",\"placeholderIsAhead\": true,\"placeholderIsLocalTime\": false},{\"cityName\": \"São Paulo\",\"timezoneOffset\": -180,\"cityNameId\": \"sao_paulo\",\"placeholderTime\": \"4:47 PM\",\"placeholderDay\": \"Today\", \"placeholderHours\": \"4\",\"placeholderIsAhead\": true,\"placeholderIsLocalTime\": false},{\"cityName\": \"Tokyo\",\"timezoneOffset\": 510,\"cityNameId\": \"tokyo\",\"placeholderTime\": \"4:47 AM\",\"placeholderDay\": \"Tomorrow\", \"placeholderHours\": \"16\",\"placeholderIsAhead\": true,\"placeholderIsLocalTime\": false},{\"cityName\": \"New York\",\"timezoneOffset\": -240,\"cityNameId\": \"new_york\",\"placeholderTime\": \"3:47 PM\",\"placeholderDay\": \"Today\", \"placeholderHours\": \"3\",\"placeholderIsAhead\": true,\"placeholderIsLocalTime\": false},{\"cityName\": \"Bucharest\",\"timezoneOffset\": 180,\"cityNameId\": \"bucharest\",\"placeholderTime\": \"10:47 PM\",\"placeholderDay\": \"Today\", \"placeholderHours\": \"10\",\"placeholderIsAhead\": true,\"placeholderIsLocalTime\": false}]";

    convertLocalDateToUTCDate();
    $.each(jQuery.parseJSON(jsonData), function(i,field){
      $("#worldCitiesList").append( "<li><p class=\"city\">"+field.cityName+"</p><p class=\"time-details\">"+differenceInHours(field.timezoneOffset)+"</p><p class=\"time\">"+convertLocalDateToUTCDate(field.timezoneOffset)+"</p></li>");
      
    });
    

  });
