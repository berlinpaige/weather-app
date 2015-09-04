$(document).ready(init);

function init(){
  $('#goButton').click(locationEntered);
  $('#currentLocation').click(currentLocationClicked);
  $("#goButton").click(function(){
    if($('#goButton').css("right") <= "-40px"){
      $("#goButton").animate({right:'0%'});        
    }else{
      $("#goButton").animate({right:'-30%'});      
    }   
  });
  $("#currentLocation").click(function(){
    if($('#goButton').css("right") <= "-40px"){
      $("#goButton").animate({right:'0%'});        
    }else{
      $("#goButton").animate({right:'-30%'});      
    }   
  }); 
}

var currentCity = '';
var currentStateorCountry = '';
var zipCode = '';

function currentLocationClicked(e){
  var currentLocation = $.ajax('http://api.wunderground.com/api/751291fe8abdb495/geolookup/q/autoip.json',{
    dataType: 'jsonp',
    method: 'GET',
    timeout: 3000
  }).success(function(data){
    currentCity = data.location.city + ', ';
    currentStateorCountry = data.location.state;
    currentCountry = data.location.country;
    goClicked();  
  }).fail(function(error){
    console.log('fail', data);
     $('#weatherCheck').text('oops! we can find you! try typing your location instead');
  });
}
function locationEntered(){
  currentCity = $('#desiredCity').val();
  currentStateorCountry = $('#desiredState').val();
  zipcode = $('#desiredZip').val();
  goClicked();
}
function goClicked(e){
  var promise = $.ajax('http://api.wunderground.com/api/751291fe8abdb495/conditions/q/'+ encodeURI(currentStateorCountry) +'/'+ encodeURI(currentCity || zipcode) +'.json', {
    dataType: 'jsonp',
    method: 'GET'
  }).success(function(data){
    if(data.response.error){
      $('#weatherCheck').text("oops. we can't seem to find that location");
    }else{
      $('#weatherCheck').text("let's check the weather");
      $('#city').text(data.current_observation.display_location.city + ', ');
      $('#state').text(data.current_observation.display_location.state);
      $('#temp').text(data.current_observation.temperature_string);
      $('#time').text(data.current_observation.observation_time);
      $('#humidity').text(data.current_observation.relative_humidity + ' humidity');
      $('#weather').text(data.current_observation.weather);
      weeklyForcast(e);
      
      function weeklyForcast(e){
        var promise2 = $.ajax('http://api.wunderground.com/api/751291fe8abdb495/forecast10day/q/'+ encodeURI(currentStateorCountry)+'/'+ encodeURI(currentCity || zipcode) +'.json', {
          dataType: 'jsonp',
          method: 'GET'
          }).success(function(data){
             $('#weatherOfDay0').text(data.forecast.txt_forecast.forecastday[0].fcttext);
             $('#weatherOfDay1').text(data.forecast.txt_forecast.forecastday[2].fcttext);
             $('#weatherOfDay2').text(data.forecast.txt_forecast.forecastday[4].fcttext);
             $('#weatherOfDay3').text(data.forecast.txt_forecast.forecastday[6].fcttext);
             $('#weatherOfDay4').text(data.forecast.txt_forecast.forecastday[8].fcttext);
             $('#weatherOfDay5').text(data.forecast.txt_forecast.forecastday[10].fcttext);
             $('#weatherOfDay6').text(data.forecast.txt_forecast.forecastday[12].fcttext);
             $('#weatherOfDay7').text(data.forecast.txt_forecast.forecastday[14].fcttext);
             $('#weatherOfDay8').text(data.forecast.txt_forecast.forecastday[16].fcttext);
             $('#weatherOfDay9').text(data.forecast.txt_forecast.forecastday[18].fcttext);
             $('#dayOfWeek0').text(data.forecast.txt_forecast.forecastday[0].title);
             $('#dayOfWeek1').text(data.forecast.txt_forecast.forecastday[2].title);
             $('#dayOfWeek2').text(data.forecast.txt_forecast.forecastday[4].title);
             $('#dayOfWeek3').text(data.forecast.txt_forecast.forecastday[6].title);
             $('#dayOfWeek4').text(data.forecast.txt_forecast.forecastday[8].title);
             $('#dayOfWeek5').text(data.forecast.txt_forecast.forecastday[10].title);
             $('#dayOfWeek6').text(data.forecast.txt_forecast.forecastday[12].title);
             $('#dayOfWeek7').text(data.forecast.txt_forecast.forecastday[14].title);
             $('#dayOfWeek8').text(data.forecast.txt_forecast.forecastday[16].title);
             $('#dayOfWeek9').text(data.forecast.txt_forecast.forecastday[18].title);
          }).fail(function(error){
             $('#weatherCheck').text("oops. we can't seem to find that data" );
        });
      }
    }
  }).fail(function(error){
     $('#weatherCheck').text("oops. we can't seem to find that location");
  });
}