$(document).ready(function () {
  let streamUrl, userStatus, userLg, userFollowers, userUrl, userName, userLogo;
  const url = "https://wind-bow.glitch.me/twitch-api/streams/";
  const followerUrl =
    "https://wind-bow.glitch.me/twitch-api/users/tehmann83/follows/channels";
  const followers = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas"
  ];

  const fccUrl =
    "https://wind-bow.glitch.me/twitch-api/streams/freecodecamp/?callback?";
  $.getJSON(fccUrl, function (data1) {
    //Check if FCC is online
    if (data1.stream != null) {
      $("#fccStatus").html("freeCodeCamp is online");
    } else {
      $("#fccStatus").html("freeCodeCamp is offline");
    }
  });
  //Check if the user's logo exist
  function defaultLogo() {
    if (userLogo === null) {
      userLogo = "https://image.ibb.co/f6WPhQ/default.jpg";
    }
  }

  //If the users are online
  for (let i = 0; i < followers.length; i++) {
    (function (i) {
      streamUrl = url + followers[i] + "/?callback?";
      $.getJSON(streamUrl, function (data2) {
        if (data2.stream != null) {
          userName = data2.stream.channel.display_name;
          userLogo = data2.stream.channel.logo;
          userStatus = data2.stream.channel.status.slice(0, 25) + "...";
          userUrl = data2.stream.channel.url;
          userFollowers = data2.stream.channel.followers;
          userLg = data2.stream.channel.language;
          defaultLogo();

          $(".followerInfo").prepend(
            "<figure class='channel live'><div class='image'>" +
            "<img src='" +
            userLogo +
            "' alt='Card image cap'></div>" +
            "<figcaption><div class='date'><span class='day'>On</span></div><h5>" +
            userStatus +
            "</h5><h3>" +
            userName +
            "</h3><footer><div class='watch'><button class='btn btn-primary'>Watch Now!</button></div><div class='icons'><div class='views'><i class='fa fa-eye' aria-hidden='true'></i>" +
            userFollowers +
            "</div><div class='love'><i class='fa fa-language' aria-hidden='true'></i>" +
            userLg +
            "</div></div></footer></figcaption><a href='" +
            userUrl +
            "'></a></figure>"
          );
        } else {
          //If the users are offline
          $.getJSON(followerUrl, function (data3) {
            userName = data3.follows[i].channel.display_name;

            userLogo = data3.follows[i].channel.logo;
            userFollowers = data3.follows[i].channel.followers;
            userLg = data3.follows[i].channel.language;
            userUrl = data3.follows[i].channel.url;
            userStatus = "Offline";
            defaultLogo();
            $(".followerInfo").append(
              "<figure class='channel off'><div class='image'>" +
              "<img src='" +
              userLogo +
              "' alt='Card image cap'></div>" +
              "<figcaption><div class='date'><span class='day'>Off</span></div><h5>" +
              userStatus +
              "</h5><h3>" +
              userName +
              "</h3><footer><div class='watch'><button type='button' class='btn'>More info...</button></div><div class='icons'><div class='views'><i class='fa fa-eye' aria-hidden='true'></i>" +
              userFollowers +
              "</div><div class='love'><i class='fa fa-language' aria-hidden='true'></i>" +
              userLg +
              "</div></div></footer></figcaption><a href='" +
              userUrl +
              "'></a></figure>"
            );
          });
        }
      });
    })(i);
  }

  // Buttons
  $("#online").click(function () {
    $(".live").fadeIn("slow");
    $(".off").fadeOut("slow");
  });

  $("#offline").click(function () {
    $(".off").fadeIn("slow");
    $(".live").fadeOut("slow");
  });

  $("#all").click(function () {
    $(".live").fadeIn("slow");
    $(".off").fadeIn("slow");
  });
});
