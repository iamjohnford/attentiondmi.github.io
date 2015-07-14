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
          $("span[class^='word']:textEquals(" + wordToHighlight + ")").removeClass("highlight");
        } else {
          addHighlightToGlobalList(wordToHighlight);
        }

        //Then reset the highlights no matter what:
        highlightPreviouslyHighlightedWordsInTranscript();
      } else if (key.toLowerCase().indexOf("lookup") > -1) {

        var wordToLookup = currentlySelectedWord.innerText;

        console.log("Okay. I'm gonna define: " + wordToLookup);

        wordToLookup = removePunctuation(wordToLookup.trim());

        if (!dvPlayer.paused()) {
          pauseAudio();
          playerWasPlayingAndIsNowTemporarilyPaused = true;
        }

        var meaning = $(this).attr("meaning");

        console.log("the meaning to put in the submit box is:" + meaning);
        
        showDictionary(wordToLookup);

        $('#submit_definition_box').val(meaning);
      }
    },
    items: {
      "highlight": {
        name: "Toggle Highlight"
      },
      "lookup": {
        name: "Dictionary Lookup"
      }
    }
  });
});