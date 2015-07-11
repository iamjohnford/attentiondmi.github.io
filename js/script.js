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

    $(".dvIntroduction").hide();
    $("#dv_transcript_korean").html("<span class='dvSentence' language='ko'>" + value + "</span>");

    loadMediaPlayer();

    console.log("About to show controls...");
    $("#controls").show();

    $(".dvSentence").lettering('lines').children('span').lettering('words');

    e.preventDefault();
  });


  $('body').on('click', '.submit_definition_button', function(e) {
    var defn = $("#submit_definition_box").val();

    if ( $(currentlySelectedWord).tooltipster() ) {
      $(currentlySelectedWord).tooltipster('destroy');
    }

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
    var $li = $(".sidebar li");

    $li.hide();
    $li.filter(function() {
      return $(this).text().toLowerCase().indexOf(query) > -1;
    }).show();

  });


  //Update the text of the dictionary toggle button
  $('body').on('click', '#open_right_sidebar', function() {
    console.log("Figuring out what to do with the dictionary toggle button...");

    if ($('.control-sidebar').hasClass('control-sidebar-open')) {
      console.log("Looks like it's already open...");
      $('#open_right_sidebar').html('<i class="fa fa-hand-o-left"> Show Dictionary</i>');
      hideDictionary();

    } else {
      console.log("Looks like it's closed...");
      $('#open_right_sidebar').html('<i class="fa fa-hand-o-right"> Hide Dictionary</i>');
      showDictionary("");
    }
  });
});

var showDictionary = function(lookupWord) {
  $('.control-sidebar').addClass('control-sidebar-open');
  if (lookupWord === "") {
    return;
  }
  var definitionURL = "http://dic.daum.net/search.do?q=" + lookupWord + "&dic=ee";
  $('#open_right_sidebar').show();
  $(".control-sidebar").html("<h1>Loading Dictionary...</h1>");

  var iframe = "<iframe target='_top' width='100%' height='100%' src=" + definitionURL + "></iframe>";
  var defineInput = '<div id="dv_definitions_userentry"><input type="text" id="submit_definition_box" class="submit_definition_box" placeholder="Type your own definition here"></input> <input type="submit" class="submit_definition_button" value="Define This"></input></div>';

  $(".control-sidebar").html(iframe + "\r\n" + defineInput);


};

var hideDictionary = function() {

  console.log("hiding dictionary!");
  $('.control-sidebar').removeClass('control-sidebar-open');

};
