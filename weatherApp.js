$(document).ready(init);

function init(){
  $('#goButton').click(goClicked);
  $('#city').on('keypress', inputKeypress);

}


function inputKeypress(e){
  if(e.which === 13){
    goClicked(e);
  }
}

var citySelected = $('#city').val();
console.log(citySelected);

function goClicked(e){
  var promise = $.ajax('http://api.wunderground.com/api/751291fe8abdb495/conditions/q/'+ encodeURI($('#desiredState').val()) +'/'+ encodeURI($('#desiredCity').val()) +'.json',
  {
    dataType: 'jsonp',
    method: 'GET'


  })
  .success(function(data){
  console.log('data:', data);
  var citySelected = $('#desiredCity').val();
  console.log(citySelected);
  var stateSelected = $('#desiredState').val();
  console.log(stateSelected);
  
  $('#city').text(data.current_observation.display_location.city + ', ');
  $('#state').text(data.current_observation.display_location.state);
  $('#temp').text(data.current_observation.temperature_string);
  $('#time').text(data.current_observation.observation_time);
  $('#humidity').text(data.current_observation.relative_humidity + ' humidity');
  $('#weather').text(data.current_observation.weather);
  })
  .fail(function(error){
  console.log('error:', error);
  });
  console.log('promise', promise);
}