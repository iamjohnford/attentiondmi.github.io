$(document).ready(function() {

});

/*** Definitions Entered by User ***/
highlightPreviouslyDefinedWordsInTranscript = function(onlyThisSpecificWord) {
  var previouslyDefinedWords = getDefinitionGlobalList();



  $(previouslyDefinedWords).each(function() {
    var wordToDefine = this.word;
    var defn = this.meaning;

    // console.log("I should blue highlight: " + wordToDefine);

    if (onlyThisSpecificWord !== undefined && onlyThisSpecificWord.length > 0) {
      if (wordToDefine !== onlyThisSpecificWord) return true; //i.e. "continue this loop, but skip this iteration"
    }

    var listOfWordsToDefine = $("span[class^='word']:textEquals(" + wordToDefine + ")");

    $("span[class^='word']:textEquals(" + wordToDefine + ")").each(function() {
      if ($(this).tooltipster()) {
        $(this).tooltipster('destroy');
      }

      $(this).tooltipster({
        content: $('<span>' + defn + '</span>')
      });

      $(this).addClass("hasDefinitionNow");
    });

  });
};

addDefinitionToGlobalList = function(word, meaning) {

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

  if (allDefinitions === null) return;

  var i = allDefinitions.length;
  while (i--) {
    if (allDefinitions[i].word === word) {
      allDefinitions.splice(i, 1);
    }
  }

  localStorage.setObj("defn", allDefinitions);
};

getDefinitionGlobalList = function() {
  allDefinitions = localStorage.getObj("defn");
  allDefinitions = uniq_fast(allDefinitions);

  return allDefinitions;
};

/*** END Definitions Entered by User ***/

/*** Highlights Entered by User ***/
highlightPreviouslyHighlightedWordsInTranscript = function(onlyThisSpecificWord) {
  var previouslyHighlightedWords = getHighlightsGlobalList();

  $(previouslyHighlightedWords).each(function() {
    var wordToHighlight = this;

    // console.log("I should YELLOW highlight: " + wordToHighlight);

    if (onlyThisSpecificWord !== undefined && onlyThisSpecificWord.length > 0) {
      if (wordToHighlight !== onlyThisSpecificWord) return true; //i.e. "continue this loop, but skip this iteration"
    }

    $("span[class^='word']:textEquals(" + wordToHighlight + ")").each(function() {
      $(this).addClass("highlight");
    });

  });
};

addHighlightToGlobalList = function(word) {

  allHighlights = getHighlightsGlobalList();

  if (allHighlights === null) {
    allHighlights = [];
  }

  allHighlights.push(word);

  localStorage.setObj("highlights", allHighlights);
};

removeHighlightFromGlobalList = function(word) {
  allHighlights = getHighlightsGlobalList();

  if (allHighlights === null) return;

  var i = allHighlights.length;
  while (i--) {
    if (allHighlights[i] === word) {
      allHighlights.splice(i, 1);
    }
  }
  // delete allHighlights[word];

  localStorage.setObj("highlights", allHighlights);
};

getHighlightsGlobalList = function() {
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
