$(function() {
  $.contextMenu({
    selector: 'span[class^="word"]',
    trigger: 'left',
    callback: function(key, options) {
      if (key.toLowerCase().indexOf("highlight") > -1) {
        contextMenu_action_highlight();
      } else if (key.toLowerCase().indexOf("lookup") > -1) {
        contextMenu_action_lookup();

      } else if (key.toLowerCase().indexOf("define") > -1) {
        contextMenu_action_defineByUser();
      }
    },
    items: {
      "highlight": {
        name: "<i class='fa fa-fw fa-thumb-tack'></i> Toggle Highlight <span class='contextMenuShortcutKey'>H</span>"
      },
      "lookup": {
        name: "<i class='fa fa-fw fa-book'></i> Dictionary Lookup <span class='contextMenuShortcutKey'>D</span>"
      },
      "define": {
        name: "<i class='fa fa-fw fa-pencil'></i> My Own Definition <span class='contextMenuShortcutKey'>W</span>"
      }
    }
  });
});

contextMenu_action_highlight = function() {
  var wordToHighlight = currentlySelectedWord.innerText;

  alreadyHighlighted = $(currentlySelectedWord).hasClass("highlight");

  if (alreadyHighlighted) {
    removeHighlightFromGlobalList(wordToHighlight);
    addOrRemoveClassIfTextContains("span[class^='word']", wordToHighlight, "highlight", false);
  } else {
    addHighlightToGlobalList(wordToHighlight);
  }

  //Then reset the highlights no matter what:
  highlightPreviouslyHighlightedWordsInTranscript();
};

contextMenu_action_lookup = function() {
  var wordToLookup = currentlySelectedWord.innerText;

  console.log("About to look up the word: " + wordToLookup);
  wordToLookup = removePunctuation(wordToLookup.trim());

  if (!dvPlayer.paused()) {
    pauseAudio();
    playerWasPlayingAndIsNowTemporarilyPaused = true;
  }

  showDictionary(wordToLookup);

  var meaning = $(this).attr("meaning");

  $('#submit_definition_box').val(meaning);
};

contextMenu_action_defineByUser = function() {
  var wordToDefine = removePunctuation(currentlySelectedWord.innerText);
  var existingDefinition = $(currentlySelectedWord).attr("meaning");

  if (existingDefinition !== undefined && existingDefinition.length > 0) {
    $("#submit_definition_box").val(existingDefinition);
    $(".remove_definition_button").show();
  } else {
    $(".remove_definition_button").hide();
  }

  $("#modal_definitions .modal-title").html("Please enter below your definition for [" + wordToDefine + "]");
  $("#submit_definition_box").attr("Placeholder", "Type your own definition for " + wordToDefine + " here.");

  $('#modal_definitions').modal();
};

// ************* Keyboard EVENTS *************

$(document).ready(function() {

  //Key Bindings

  $(document).on('keydown', null, 'h', function() {

    contextMenu_action_highlight();
    $(currentlySelectedWord).contextMenu("hide");

  });

  $(document).on('keydown', null, 'd', function() {
    contextMenu_action_lookup();
    $(currentlySelectedWord).contextMenu("hide");
  });

  $(document).on('keydown', null, 'w', function() {
    contextMenu_action_defineByUser();
    $(currentlySelectedWord).contextMenu("hide");
  });

});