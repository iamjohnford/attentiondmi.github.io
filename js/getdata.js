$(document).ready(function() {
    var myItems;

    $.getJSON('data/iyagi.json', function(data) {


        var output = "\r\n";

        $(data).each(function() {
          var title = this.title;
          var content = this.content;
          output = output +  "<li class='sidebar_item' content='" + content + "'>"+ title + "</li>";
        });

        $("#sidebar").html("<ul class='sidebar_menu'><h3 class='sidebar_title'>Choose an Episode</h3>" + output + "</ul>");
    });

    // $("#sidebar").html("hello!");
});
