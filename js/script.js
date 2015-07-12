$(document).ready(function() {

  currentlySelectedWord = "";

  $('body').on('click', 'span[class^="word"]', function(e) {
    var selectedText = $(this).text();
    addHighlightToGlobalList(selectedText);
    highlightPreviouslyHighlightedWordsInTranscript();
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

    var title = $(this).attr("media_title");
    var transcript = $(this).attr("media_content");
    var media_url = $(this).attr("media_url");
    var value = transcript.replace(/\n/g, '<br />');

    $(".dvIntroduction").hide();
    $("#dv_transcript_korean").html("<span class='dvSentence' language='ko'>" + value + "</span>");

    $('span[class^="word"]').wordBreakKeepAll(); //prevent Korean words from being broken apart

    $('.content-header').html("<h1>" + title + "</h1>");
    loadMediaPlayer(media_url);

    $("#controls").show();

    $(".dvSentence").lettering('lines').children('span').lettering('words');

    hideLeftSideBar();
    hideDictionary();
    $('.content').scrollTop();
    highlightPreviouslyDefinedWordsInTranscript();
    highlightPreviouslyHighlightedWordsInTranscript();
    e.preventDefault();
  });


  $('body').on('click', '.submit_definition_button', function(e) {
    var defn = $("#submit_definition_box").val();
    var wordToDefine = $(currentlySelectedWord).text().trim();

    addDefinitionToGlobalList(wordToDefine, defn);

    highlightPreviouslyDefinedWordsInTranscript(wordToDefine);

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


  $('body').on('click', '#open_right_sidebar', function(e) {
    if (this.innerText.indexOf("Hide") > 0) {
      hideDictionary();
      e.preventDefault();
    } else {
      showDictionary();
      e.preventDefault();
    }
  });

  //Extend jquery with plugin
  $.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
    return function(elem) {
      return $(elem).text().match("^" + arg + "$");
    };
  });

  //Update sidebar positions depending on scroll position

  //Extend jquery with plugin
  $.fn.visibleHeight = function() {
    var elBottom, elTop, scrollBot, scrollTop, visibleBottom, visibleTop;
    scrollTop = $(window).scrollTop();
    scrollBot = scrollTop + $(window).height();
    elTop = this.offset().top;
    elBottom = elTop + this.outerHeight();
    visibleTop = elTop < scrollTop ? scrollTop : elTop;
    visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
    return visibleBottom - visibleTop;
  };

  $(window).scroll(function() {
    var visHeight = $('.navbar').visibleHeight();

    if (visHeight < 1) {
      visHeight = 0;
    }
    $('.control-sidebar').css("padding-top", visHeight);
  });

});
//end doc ready

var showDictionary = function(lookupWord) {

  $('.control-sidebar').addClass('control-sidebar-open');
  if (lookupWord === "" || lookupWord === undefined) {
    return;
  }
  var definitionURL = "http://dic.daum.net/search.do?q=" + lookupWord + "&dic=ee";
  $('#open_right_sidebar').show();
  $(".control-sidebar").html("<h1>Loading Dictionary...</h1>");

  var iframe = "<iframe target='_top' width='100%' height='100%' src=" + definitionURL + "></iframe>";
  var defineInput = '<div id="dv_definitions_userentry"><input type="text" id="submit_definition_box" class="submit_definition_box" placeholder="Type your own definition here"></input> <input type="submit" class="submit_definition_button" value="Define This"></input></div>';

  $(".control-sidebar").html(iframe + "\r\n" + defineInput);

  $('#open_right_sidebar').html('<i class="fa fa-hand-o-right"> Hide Dictionary</i>');
  makeNavMenuFixed();

  //The following has to go here because the submit_definition_box element was just dynamically created
  //And it gets dynamically recreated. As a result, we have to re-bind the below event to it at
  //each time of dynamic creation. I'm sure there's a better way, but this works

  $("input#submit_definition_box").keypress(function(e) {
    if (e.which == 13) {
      // console.log("Using the definition you typed and pressing ENTER");
      $(".submit_definition_button").click();
    }
  });

};

var hideDictionary = function() {

  $('.control-sidebar').removeClass('control-sidebar-open');
  $('#open_right_sidebar').html('<i class="fa fa-hand-o-left"> Show Dictionary</i>');
  makeNavMenuStatic();
};

var hideLeftSideBar = function() {
  $('body').removeClass('sidebar-collapse');
  $('body').addClass('sidebar-collapse');
};

var makeNavMenuFixed = function() {
  $('.navbar').removeClass('navbar-static-top');
  $('.navbar').removeClass('navbar-fixed-top');
  $('.navbar').addClass('navbar-fixed-top');
  $('.content-header').css("margin-top", "50px");
};

var makeNavMenuStatic = function() {
  $('.navbar').removeClass('navbar-fixed-top');
  $('.navbar').removeClass('navbar-static-top');
  $('.navbar').addClass('navbar-static-top');
  $('.content-header').css("margin-top", "0px");
};
