$(document).ready(function() {
  currentlySelectedWord = "";

  $('body').on('click', 'span[class^="word"]', function(e) {
    var selectedText = this.innerText;
    $(this).addClass("highlight");
  });

  $('body').on('click', '.highlight', function() {
    currentlySelectedWord = this;

    var wordToLookup = this.innerHTML;
    wordToLookup = wordToLookup.replace(/(?:[\(\)\-&$#!?\[\]{}\"\',\.]+(?:\s|$)|(?:^|\s)[\(\)\-&$#!?\[\]{}\"\',\.]+)/g, ' ').trim();

    if (!dvPlayer.paused()) {
      pauseAudio();
      playerWasPlayingAndIsNowTemporarilyPaused = true;
    }

    showDictionary(wordToLookup);
  });

  $('body').on('click', '.sidebar_item', function(e) {

    var transcript = $(this).attr("content");
    var value = transcript.replace(/\n/g, '<br />');

    $("#dv_transcript_korean").html("<span class='dvSentence' language='ko'>" + value + "</span>");

    loadMediaPlayer();

    $("#controls").show();

    $(".dvSentence").lettering('lines').children('span').lettering('words');

    e.preventDefault();
  });


  $("#dv_definitions_close_button").click(function(e) {
    hideDictionary();

    if (playerWasPlayingAndIsNowTemporarilyPaused) {
      playPauseAudio(); //Which, since it was paused, will now just play for sure
      playerWasPlayingAndIsNowTemporarilyPaused = false;
    }

    e.preventDefault();
  });

  $("#btnSubmit").click(function(e) {
    var transcript = $(".transcript").val();
    var value = transcript.replace(/\n/g, '<br />');

    $("#dv_transcript_korean").html("<span class='dvSentence' language='ko'>" + value + "</span>");
    loadMediaPlayer();

    $("#controls").show();

    $(".dvSentence").lettering('lines').children('span').lettering('words');

    e.preventDefault();
  });

  $(".submit_definition_button").click(function(e) {
    var defn = $("#submit_definition_box").val();

    $(currentlySelectedWord).tooltipster({
      content: $('<span>' + defn + '</span>')
    });

    $(currentlySelectedWord).addClass("hasDefinitionNow");

    hideDictionary();
    $("#submit_definition_box").val("");
  });

  $("#filter").keyup(function(e) {
    var query = $('#filter').val();

    // var value = $(element).val().toLowerCase();
        var $li = $(" li");

        $li.hide();
        $li.filter(function() {
            return $(this).text().toLowerCase().indexOf(query) > -1;
        }).show();

  });
});

var showDictionary = function(lookupWord) {
  $("#dv_definitions").show();
  var definitionURL = "http://dic.daum.net/search.do?q=" + lookupWord + "&dic=ee";
  $("#dv_definitions_content").html("<iframe target='_top' width='100%' height='100%' src=" + definitionURL + "></iframe>");
};

var hideDictionary = function() {
  $("#dv_definitions").hide();
};
