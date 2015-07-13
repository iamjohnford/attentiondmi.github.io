$(document).ready(function() {

});

/*** Definitions Entered by User ***/
highlightPreviouslyDefinedWordsInTranscript = function() {
  var previouslyDefinedWords = getDefinitionGlobalList();

  var massiveSelectorString = "";
  allMeanings = [];

  $(previouslyDefinedWords).each(function() {
    var wordToDefine = this.word;
    var defn = this.meaning;

    // console.log("I''ll need to eventually blue highlight: " + wordToDefine + "...");
    // console.log("... with a meaning of: " + defn);

    allMeanings.push(defn);

    massiveSelectorString = massiveSelectorString + "span[class^='word']:textEquals('" + wordToDefine + "')" + ", ";
  });

  massiveSelectorString = massiveSelectorString.slice(0, -2); //slice off the last comma + space

  var listOfWordsToDefine = $(massiveSelectorString);
  // console.log("Now the list of words to define is: " + listOfWordsToDefine);

  $(massiveSelectorString).addClass("hasDefinitionNow");

  console.log("Destroying any existing tooltips");
  $(massiveSelectorString).each(function() {
    console.log("... for " + $(this));
    if ($(this).tooltipster()) {
      $(this).tooltipster('destroy');
    }


    var curMeaning = allMeanings.shift();
    console.log("Assigning to this one a meaning of: " + curMeaning);
    $(this).tooltipster({
      content: $('<span>' + curMeaning + '</span>')
    });
  });

  // if ($(listOfWordsToDefine).tooltipster()) {
  //   $(listOfWordsToDefine).tooltipster('destroy');
  // }
  //
  // $(listOfWordsToDefine).tooltipster({
  //   content: $('<span>' + defn + '</span>')
  // });
  //
  // $(listOfWordsToDefine).addClass("hasDefinitionNow");

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

    console.log("I should YELLOW highlight: " + wordToHighlight);

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
