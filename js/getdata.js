$(document).ready(function() {
    var myItems;

    $.getJSON('data/iyagi.json', function(data) {
        var output = "\r\n";

        $(data).each(function() {
          var title = this.title;
          var content = this.content;
          var media_url = this.media_url;
          var poster = this.poster;

          output = output +  "<li class='sidebar_item' media_url = '" + media_url + "' poster = '" + poster + "' content='" + content + "'><a href='#' title='" + title + "'><i class='fa fa-link'></i> <span>"+ title + "</span></a></li>";
        });

        $(".sidebar-menu").html("<li class='header'>CHOOSE AN EPISODE</li>" + output);
    });

    // $("#sidebar").html("hello!");
});
