$(document).ready(function() {



});

highlightPreviouslyDefinedWordsInTranscript = function (onlyThisSpecificWord){


  var previouslyDefinedWords = getDefinitionGlobalList();
  tester = previouslyDefinedWords;

  $(previouslyDefinedWords).each(function() {
    var wordToDefine = this.word;
    var defn = this.meaning;

    if (onlyThisSpecificWord !== undefined && onlyThisSpecificWord.length > 0){
      if (wordToDefine !== onlyThisSpecificWord) return true; //i.e. "continue this loop, but skip this iteration"
    }

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

  allDefinitions = localStorage.getObj("defn");

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
  allDefinitions = localStorage.getObj("defn");

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
  return allDefinitions;
};

//Extend local storage to handle objects and arrays
Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
};
