$(document).ready(function() {
    var myItems;

    $.getJSON('data/iyagi.json', function(data) {


        var output = "\r\n";

        $(data).each(function() {
          var title = this.title;
          var content = this.content;
          output = output +  "<li class='sidebar_item' content='" + content + "'><a href='#'><i class='fa fa-link'></i> <span>"+ title + "</span></a></li>";
        });

        $(".sidebar-menu").html("<li class='header'>CHOOSE AN EPISODE</li>" + output);
    });

    // $("#sidebar").html("hello!");
});
