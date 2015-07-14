$(document).ready(function() {
    var myItems;

    $.getJSON('data/iyagi.json', function(data) {
        //var output = "\r\n";

        $(data).each(function() {
          var title = this.title;
          var content = this.content;
          var media_url = this.media_url;
          var poster = this.poster;
          var language = this.language;
          var tags = this.tags;
          var source= this.source;

          var posterProp = " media_poster = '" + poster + "'";
          var media_url_prop = " media_url = '" + media_url + "'";
          var contentProp = " media_content = '" + content + "'";
          var titleProp = " media_title = '" + title + "'";
          var languageProp = " language = '" + language + "'";
          var tagsProp = " tags = '" + tags + "'";
          var sourceProp = " source = '" + source + "'";
          
          var output = "<li class='sidebar_item'" + titleProp + media_url_prop + posterProp + contentProp + languageProp + tagsProp + sourceProp + "><a href='#' title='" + title + "'><i class='fa fa-file-text'></i> <span>"+ title + "</span></a></li>";
          
          // console.log("The tags for this item are: " + tags);
          if (tags.toLowerCase().indexOf("beginner") > -1){
            $(".main-sidebar .beginner").append(output);
            // console.log("Just added this item to intermediate menu");
          }
          else if (tags.toLowerCase().indexOf("intermed") > -1){
            $(".main-sidebar .intermediate").append(output);
            // console.log("Just added this item to intermediate menu");
          }
          else if (tags.toLowerCase().indexOf("advanced") > -1){
            $(".main-sidebar .advanced").append(output);
            // console.log("Just added this item to intermediate menu");
          }
        });

        //$(".sidebar-menu").html("<li class='header'>CHOOSE AN EPISODE</li>" + output);
        
        
    });

    // $("#sidebar").html("hello!");
});
