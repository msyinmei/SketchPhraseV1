      window.fbAsyncInit = function() {
        FB.init({
          appId      : gon.fbid,
          xfbml      : true,
          version    : 'v2.1'
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));


window.onload = function(){
  var morePlayers = document.getElementById("morePlayers");
  var lessPlayers = document.getElementById("lessPlayers");
  var playersCount = parseInt(document.getElementById("playersCount").innerHTML);

  morePlayers.addEventListener('click', function() {
    console.log("clicked morePlayers");
    console.log("Players Count: " + playersCount);
    if (playersCount < 10 ){
      playersCount += 1;
      console.log("New Players Count: " + playersCount);
      $("#playersCount").empty();
      $("#playersCount").append(playersCount);
    }
    else {
      alert("3-10 players only. If you would like to add more players, please purchase our app.");
    }
  });

  lessPlayers.addEventListener('click', function() {
    console.log("clicked lessPlayers");
  console.log("Players Count: " + playersCount);
  if (playersCount > 3 ){
  playersCount -= 1;
  console.log("New Players Count: " + playersCount);
  $("#playersCount").empty();
  $("#playersCount").append(playersCount);
  }
    else {
      alert("3-10 players only. If you would like to play with ghosts, please purchase our app.");
    }
  });
};
