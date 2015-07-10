$(document).ready(function() {

  $('body').on('click', 'span[class^="word"]', function(e) {
    var selectedText = this.innerText;
    $(this).addClass("highlight");
  });

  $('body').on('click', '.highlight', function() {
    $("#dv_definitions").show();
    var definitionURL = "http://dic.daum.net/search.do?q=" + this.innerHTML + "&dic=ee";
    $("#dv_definitions_content").html("<iframe target='_top' width='100%' height='100%' src=" + definitionURL + "></iframe>");
  });


  $("#dv_definitions_close_button").click(function(e) {
    $("#dv_definitions").hide();
    e.preventDefault();
  });

  $("#btnSubmit").click(function(e) {
    var transcript = $(".transcript").val();
    var value = transcript.replace(/\n/g, '<br />');
    $("#dv_transcript_korean").html("<span class='dvSentence' language='ko'>" + value + "</span>");
    loadMediaPlayer();

    $("#controls").show();

    $(".dvSentence").lettering('words');
    e.preventDefault();
  });



});
