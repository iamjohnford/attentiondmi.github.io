videojs("the_media", {}, function() {
  // Player (this) is initialized and ready.
  dvPlayer = this;

  dvPlayer.on('timeupdate', function() {
    $(".percent_indicator").show();

    var percent = dvPlayer.currentTime() / dvPlayer.duration() * 100;
    var roundedPercent = Math.round(percent);
    // console.log("Percent done is: " + roundedPercent);

    var oldString = $("#percent_done").html();
    var newString = roundedPercent + "% Listened";

    if (oldString !== newString && percent > 0) {
      $("#percent_done").html(" " + newString);
    }

    //Make sure "Pause" button switches back to "Play" when the audio ends
    if (roundedPercent > 99) {
      $('#control_playpause').html('<i id="play_pause_button" class="fa fa-play-circle faa-wrench animated"></i> Play');
    }
  });
});

loadMediaPlayer = function(media_url) {
  dvPlayer.src({
    "type": "audio/mp3",
    "src": media_url,
  });
  playAudio();
};

playPauseAudio = function() {
  if (dvPlayer.paused()) {
    skipNumSeconds(-2);
    dvPlayer.play();
    $('#control_playpause').html('<i id="play_pause_button" class="fa fa-pause faa-pulse animated"></i> Pause');
    makeNavMenuStatic();
  } else {
    dvPlayer.pause();
    makeNavMenuFixed();
    $('#control_playpause').html('<i id="play_pause_button" class="fa fa-play-circle faa-wrench animated"></i> Play');
  }
};

playAudio = function() {
  skipNumSeconds(-2);
  dvPlayer.play();
  $('#control_playpause').html('<i id="play_pause_button" class="fa fa-pause faa-pulse animated"></i> Pause');
  makeNavMenuStatic();
};

pauseAudio = function() {
  dvPlayer.pause();
  makeNavMenuFixed();
  $('#control_playpause').html('<i id="play_pause_button" class="fa fa-play-circle faa-wrench animated"></i> Play');
};


skipNumSeconds = function(numSeconds) {
  var curTime = dvPlayer.currentTime();
  dvPlayer.currentTime(curTime + numSeconds);
  console.log("Skipping " + numSeconds + " seconds ;)");
};

nowPlaying = function(){  
  return ! dvPlayer.paused();
};

// ************* CLICK EVENTS *************

$(document).ready(function() {

  //Key Bindings

  $(document).on('keydown', null, 'ctrl', function() {
    console.log("Just control pressed!");
  });

  $(document).on('keydown', null, 'ctrl+1', function() {
    skipNumSeconds(-10);
  });

  $(document).on('keydown', null, 'ctrl+2', function() {
    skipNumSeconds(-20);
  });

  $(document).on('keydown', null, 'ctrl+3', function() {
    skipNumSeconds(-30);
  });

  $(document).on('keydown', null, 'ctrl+4', function() {
    skipNumSeconds(-40);
  });

  $(document).on('keydown', null, 'ctrl+5', function() {
    skipNumSeconds(-50);
  });

  $(document).on('keydown', null, 'ctrl+6', function() {
    skipNumSeconds(-60);
  });

  $(document).on('keydown', null, 'ctrl+shift+1', function() {
    skipNumSeconds(10);
  });

  $(document).on('keydown', null, 'ctrl+shift+2', function() {
    skipNumSeconds(20);
  });

  $(document).on('keydown', null, 'ctrl+shift+3', function() {
    skipNumSeconds(30);
  });

  $(document).on('keydown', null, 'ctrl+shift+4', function() {
    skipNumSeconds(40);
  });

  $(document).on('keydown', null, 'ctrl+shift+5', function() {
    skipNumSeconds(50);
  });

  $(document).on('keydown', null, 'ctrl+shift+6', function() {
    skipNumSeconds(60);
  });

  $(document).bind('keydown', 'space', function(e) {
    playPauseAudio();
    e.preventDefault();
  });

  // End Key Bindings


  $("#control_playpause").click(function(e) {
    playPauseAudio();
    e.preventDefault();
  });

  $("#control_back10").click(function(e) {
    skipNumSeconds(-10);
    e.preventDefault();
  });

  $("#control_back30").click(function(e) {
    skipNumSeconds(-30);
    e.preventDefault();
  });

  $("#control_forward10").click(function(e) {
    skipNumSeconds(10);
    e.preventDefault();
  });

  $("#control_forward30").click(function(e) {
    skipNumSeconds(30);
    e.preventDefault();
  });

});