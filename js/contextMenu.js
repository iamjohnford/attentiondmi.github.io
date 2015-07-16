$(function() {
  $.contextMenu({
    selector: 'span[class^="word"]',
    trigger: 'left',
    callback: function(key, options) {
      if (key.toLowerCase().indexOf("highlight") > -1) {
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
      } else if (key.toLowerCase().indexOf("lookup") > -1) {

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
      } else if (key.toLowerCase().indexOf("define") > -1) {
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
      }
    },
    items: {
      "highlight": {
        name: "Toggle Highlight"
      },
      "lookup": {
        name: "Dictionary Lookup"
      },
      "define": {
        name: "My Definition"
      }
    }
  });
});