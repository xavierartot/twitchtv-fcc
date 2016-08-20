/* jshint expr: true */
var channels = ["freecodecamp", "storbeck", "terakilobyte", 
  "habathcx","RobotCaleb","thomasballinger","noobs2ninjas",
  "beohoff","brunofin","comster404","test_channel","cretetion",
  "sheevergaming","TR7K","OgamingSC2","ESL_SC2"];

function getChannelInfo() {
  channels.forEach(function(channel) {
    function makeURL(type, name) {
      return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?callback=?';
    }
    //$.getJSON(makeURL("streams", channel), function(data) {
    $.getJSON(makeURL("streams", channel), function(data) {
      //console.log(data);
      var game, status;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      }

      //$.getJSON('https://api.twitch.tv/kraken/channels/'+channel+'?callback=?'), function(data) {
      $.getJSON(makeURL("channels", channel), function(data) {
        //console.log("value");
        //console.log(data);
        var img = data.logo != null ? data.logo : "https://placeimg.com/40/40/any",
          name = data.display_name != null ? data.display_name : channel,
          description = status === "online" ? ': ' + data.status : "", onlineFlag='';
          onlineFlag = status === 'online' ? 'online' : 'offline';
        html = 
          '<li class="box__item '+onlineFlag +'">'+ 
          '<img class="box__img" src="'+img+'" alt="">'+
          '<a class="box__link" href="'+data.url +'" title="'+data.url+'" target="_blank">'+
          name+
          '</a>'+
          '<p class="box__description ">'+description+'</p>'+
          '</li>';
        if(status === "online") {
          $(".box").prepend(html); 
        }else{
          $(".box").append(html);
        }
      });
    });
  });
}
$(document).ready(function() {
  getChannelInfo();

  $('.description').each(function (index) {
  });
  //console.log(description.length);
  $('.online').click(function(){
    if (this.checked) {
      $('.online').show('slow');
      $('.offline').hide('slow').prop('checked', false);
      $('.all').prop('checked', false);
    }
  });
  $('.offline').click(function(){
    if (this.checked) {
      $('.online').hide('slow');
      $('.offline').show('slow');
      $('.online').hide('slow').prop('checked', false);
      $('.all').prop('checked', false);
    }
  });
  $('.all').click(function(){
    if (this.checked) {
      $('.online').prop('checked', false);
      $('.offline').prop('checked', false);
      $('.offline, .online').show('slow');

    }
  });
});
