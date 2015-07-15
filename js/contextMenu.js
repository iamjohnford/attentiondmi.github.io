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

        wordToLookup = removePunctuation(wordToLookup.trim());

        if (!dvPlayer.paused()) {
          pauseAudio();
          playerWasPlayingAndIsNowTemporarilyPaused = true;
        }        

        var meaning = $(this).attr("meaning");
        
        showDictionary(wordToLookup);

        $('#submit_definition_box').val(meaning);
      }
      else if(key.toLowerCase().indexOf("define") > -1){
        console.log("About to bring up modal for definitions!");
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
        name: "Give a Definition"
      }
    }
  });
});