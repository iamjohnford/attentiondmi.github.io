$(document).ready(function() {
    var myItems;

    $.getJSON('data/iyagi.json', function(data) {
        var output = "\r\n";

        $(data).each(function() {
          var title = this.title;
          var content = this.content;
          var media_url = this.media_url;
          var poster = this.poster;

          var posterProp = " media_poster = '" + poster + "'";
          var media_url_prop = " media_url = '" + media_url + "'";
          var contentProp = " media_content = '" + content + "'";
          var titleProp = " media_title = '" + title + "'";

          output = output +  "<li class='sidebar_item'" + titleProp + media_url_prop + posterProp + contentProp  + "><a href='#' title='" + title + "'><i class='fa fa-file-text'></i> <span>"+ title + "</span></a></li>";
        });

        $(".sidebar-menu").html("<li class='header'>CHOOSE AN EPISODE</li>" + output);
    });

    // $("#sidebar").html("hello!");
});
