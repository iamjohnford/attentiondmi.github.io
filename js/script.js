$(document).ready(function() {

  playerWasPlayingAndIsNowTemporarilyPaused = false;
  currentlySelectedWord = "";
  currentLanguage = "ko";

  $('body').on('click', 'span[class^="word"]', function(e) {
    currentlySelectedWord = this;
  });

  $('body').on('click', '.sidebar_item', function(e) {

    var title = $(this).attr("media_title");
    var transcript = $(this).attr("media_content");
    var media_url = $(this).attr("media_url");
    var media_source = $(this).attr("source");

    currentLanguage = $(this).attr("language");

    //remove blank lines from transcript first
    transcript = transcript.replace(new RegExp('\n?\r?\n', 'g'), '<br />');
    media_source = "<a href='" + media_source + "' target='_blank'>Via " + media_source + "</a>";
    $(".dvIntroduction").hide();
    $("#dv_transcript_korean").html("<span class='media_source'>" + media_source + "</span><span class='dvSentence' language='ko'>" + transcript + "</span > ");

    $(".dvSentence").lettering('lines').children('span').lettering('words');
    $('span[class^="word"]').wordBreakKeepAll(); //prevent Korean words from being broken apart

    $('.content-header').html("<h1>" + title + "</h1>");
    loadMediaPlayer(media_url);

    $(".controls-footer").show();
    $("#settings").show();

    hideLeftSideBar();
    hideDictionary();

    //scroll the transcript to the top when it loads up
    $("html, body").animate({
      scrollTop: 0
    }, "slow");

    highlightPreviouslyDefinedWordsInTranscript();
    highlightPreviouslyHighlightedWordsInTranscript();
    e.preventDefault();

  });


  $('body').on('click', '.submit_definition_button', function(e) {

    var meaning = $("#submit_definition_box").val();
    var wordToDefine = removePunctuation($(currentlySelectedWord).text()).trim();

    addDefinitionToGlobalList(wordToDefine, meaning);

    highlightPreviouslyDefinedWordsInTranscript(wordToDefine);

    $("#submit_definition_box").val("");

    $('#modal_definitions').modal('hide');
  });

  $('body').on('click', '.remove_definition_button', function(e) {
    var wordToDefine = removePunctuation($(currentlySelectedWord).text()).trim();
    removeDefinitionFromGlobalList(wordToDefine);
    highlightPreviouslyDefinedWordsInTranscript(wordToDefine);

    $("#submit_definition_box").val("");

    $('#modal_definitions').modal('hide');
  });
  
  $("#filter").keyup(function(e) {
    $(".treeview").addClass("active");

    var query = $('#filter').val();
    // var value = $(element).val().toLowerCase();
    var $li = $(".sidebar a").not(".difficulty_level");

    $li.hide();
    $li.filter(function() {
      return $(this).text().toLowerCase().indexOf(query) > -1;
    }).show();

  });

  $('body').on('click', '#open_right_sidebar', function(e) {
    console.log("The dictionary button text is:"  + this.innerText);
    
    if (this.innerText.indexOf("Hide") > 0) {
      console.log("Therefore, I'm going to hide the dictionary and thus change the text to 'show'");
      hideDictionary();
      e.preventDefault();
    } else {
      console.log("Therefore, I'm going to show the dictionary and thus change the text to 'hide'");
      showDictionary();
      e.preventDefault();
    }
  });


  $("input#submit_definition_box").keypress(function(e) {
    if (e.which == 13) {
      $(".submit_definition_button").click();
    }
  });

  //Extend jquery

  addOrRemoveClassIfTextContains = function(selector, containsSearchTerm, classToModify, addThisClass) {
    containsSearchTerm = removePunctuation(containsSearchTerm.trim());

    $(selector + ':contains("' + containsSearchTerm + '")').filter(function(index) {

      var searchText = containsSearchTerm;
      var compareText = removePunctuation($(this).text().trim());

      if (compareText === searchText) {
        if (addThisClass) {
          $(this).addClass(classToModify);
        } else {
          $(this).removeClass(classToModify);
        }
      }
    });
  };

  removePunctuation = function(str) {
    str = str.trim();
    return str.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "");
  };

  //Extend jquery or javascript with plugins and functions
  //.visibleHeight is used for controlling whether the menu shows up when scrolling on mobile
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

  //return an array with only unique vals
  uniq_fast = function(arr) {
    if (arr === undefined || arr === null) {
      return [];
    }
    return arr.slice().sort(function(a, b) {
      return a - b;
    }).reduce(function(a, b) {
      if (a.slice(-1)[0] !== b) a.push(b);
      return a;
    }, []);

  };
});

//end doc ready

var showDictionary = function(lookupWord) {

  // console.log("The value of nowPlaying() is: " + nowPlaying());
  // if (nowPlaying()) {
  //   console.log("The audio was playing before, and is now paused for a moment");
  //   playerWasPlayingAndIsNowTemporarilyPaused = true;
  // } else {
  //   console.log("The audio was NOT PLAYING when I went to show the dictionary");
  //   playerWasPlayingAndIsNowTemporarilyPaused = false;
  // }
  
  $('.control-sidebar').addClass('control-sidebar-open');
  
  if (lookupWord !== undefined && lookupWord.length > 0) {
    // var lang = "ee";
    // if (currentLanguage === "en") {
    //   lang = "eng";
    // } else {
    //   lang = "ee";
    // }
    
    $(".dictionary_embed").html("<h1>Loading Dictionary...</h1>");
    
    var lang = "eng";

    var definitionURL = "http://dic.daum.net/search.do?q=" + lookupWord + "&dic=" + lang;
    var iframe = "<iframe target='_top' width='100%' height='100%' src=" + definitionURL + "></iframe>";
    $(".dictionary_embed").html(iframe);
  } 
  
  //otherwise just show the sidebar with the previous lookup still there

  $('#open_right_sidebar').show();
  $('#open_right_sidebar').html('<i class="fa fa-hand-o-right"> Hide Dictionary</i>');
  
  makeNavMenuFixed();


  // if (isMobile()) {
  //   console.log("Yep, we're mobile, so hiding the controls.");
  //   $('.player_control').hide();
  // }

};

var hideDictionary = function() {

  $('.control-sidebar').removeClass('control-sidebar-open');
  $('#open_right_sidebar').html('<i class="fa fa-hand-o-left"> Show Dictionary</i>');
  makeNavMenuStatic();
  // if (playerWasPlayingAndIsNowTemporarilyPaused) {playAudio();}
};

var hideLeftSideBar = function() {
  $('body').removeClass('sidebar-collapse');
  $('body').addClass('sidebar-collapse');
  $('body').removeClass('sidebar-open');
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

var isMobile = function() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};