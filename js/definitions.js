$(document).ready(function() {
  $('.modal').on('shown.bs.modal', function() {
    $("#submit_definition_box").focus();
  });
});

/*** Definitions Entered by User ***/
highlightPreviouslyDefinedWordsInTranscript = function() {

  var previouslyDefinedWords = getDefinitionGlobalList();

  $(previouslyDefinedWords).each(function() {
    
    var meaningStillWithPunctuation = this.meaning.trim();
    
    var wordToDefine = this.word;
    wordToDefine = removePunctuation(wordToDefine.trim());

    var defn = this.meaning;
    defn = removePunctuation(defn.trim());

    var listOfWordsToDefine = function() {
      containsSearchTerm = wordToDefine;

      return $('span[class^="word"]:contains("' + containsSearchTerm + '")').filter(function(index) {

        var searchText = containsSearchTerm;
        var compareText = removePunctuation($(this).text().trim());

        if (compareText === searchText) {
          return $(this);
        }

      });
    };

    $(listOfWordsToDefine()).each(function() {
      if ($(this).hasClass("tooltipstered")) {
        $(this).tooltipster('destroy');
      }

      $(this).tooltipster({
        content: $('<span>' + meaningStillWithPunctuation + '</span>') //can't just be defn, because defn had its punctuation removed, and here we want the original string instead
      });


      $(this).attr("meaning", defn);

      $(this).addClass("hasDefinitionNow");
    });

  });
};

addDefinitionToGlobalList = function(word, meaning) {

  word = removePunctuation(word.trim());
  meaning = meaning.trim();

  allDefinitions = getDefinitionGlobalList();

  if (allDefinitions === null) {
    allDefinitions = [];
  }

  var newDefinition = {
    word: word,
    meaning: meaning
  };

  allDefinitions.push(newDefinition);

  localStorage.setObj("defn", allDefinitions);
};

removeDefinitionFromGlobalList = function(word) {
  allDefinitions = getDefinitionGlobalList();
  word = removePunctuation(word.trim());

  // console.log("About to remove the definition for the word: " + word);
  // console.log("Before, the global list of definitions had numItems=" + getDefinitionGlobalList().length);
  // 
  if (allDefinitions === null) {
    return;
  }

  var i = allDefinitions.length;
  while (i--) {
    var existingDefinition = removePunctuation(allDefinitions[i].word);
    // console.log("Going through the list of definitions, I'm now considering the word [" + existingDefinition +"]");
    if (existingDefinition === word) {
      allDefinitions.splice(i, 1); //remove it from the array and close the subsequent hole
    }
  }
  
  localStorage.setObj("defn", allDefinitions);

  $('span[class^="word"]:contains("' + word + '")').filter(function(index) {
    tester = $(this);

    if ($(this).hasClass("tooltipstered")) {
      $(this).tooltipster('destroy');
    }

    $(this).removeClass("hasDefinitionNow");
  });

  
};

getDefinitionGlobalList = function() {
  allDefinitions = localStorage.getObj("defn");
  allDefinitions = uniq_fast(allDefinitions);

  return allDefinitions;
};

/*** END Definitions Entered by User ***/


// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------



/*** Highlights Entered by User ***/
highlightPreviouslyHighlightedWordsInTranscript = function() {

  var previouslyHighlightedWords = getHighlightsGlobalList();

  $(previouslyHighlightedWords).each(function() {
    var wordToHighlight = this;
    wordToHighlight = removePunctuation(wordToHighlight.trim());

    addOrRemoveClassIfTextContains("span[class^='word']", wordToHighlight, "highlight", true);

  });
};

addHighlightToGlobalList = function(word) {
  word = word.trim();

  allHighlights = getHighlightsGlobalList();

  if (allHighlights === null) {
    allHighlights = [];
  }

  allHighlights.push(word);
  localStorage.setObj("highlights", allHighlights);

  allHighlights = getHighlightsGlobalList();
};

removeHighlightFromGlobalList = function(word) {
  allHighlights = getHighlightsGlobalList();

  if (allHighlights === null) return;

  var i = allHighlights.length;
  while (i--) {
    var comparer = removePunctuation(allHighlights[i].trim());
    var wordToRemove = removePunctuation(word.trim());


    if (comparer === wordToRemove) {
      allHighlights.splice(i, 1);
    }
  }

  localStorage.setObj("highlights", allHighlights);
};

getHighlightsGlobalList = function() {

  if (localStorage.getObj("highlights") === undefined || localStorage.getObj("highlights") === null) {
    return [];
  }

  allHighlights = localStorage.getObj("highlights");
  allHighlights = uniq_fast(allHighlights);
  return allHighlights;
};

/*** END Definitions Entered by User ***/



//Extend local storage to handle objects and arrays
Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
};