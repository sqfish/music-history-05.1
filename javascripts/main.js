requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

requirejs(["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs"], 
  function ($, Handlebars, bootstrap, dom, populateSongs, getMoreSongs) {
  var outputHTML = dom.getOutputElement();
  populateSongs.getSongs(displaySongData); //Display song data

  function displaySongData (songArray) {
    require(['hbs!../templates/songs'], function(songTemplate) {
      $(outputHTML).html("");
      displayMoreButton(outputHTML); 
      $(outputHTML).prepend(songTemplate(songArray));
    });
  }

  function displayMoreButton(playlistHTML) {
    var moreButton = document.createElement("BUTTON");
    moreButton.id = "moreButton";
    $(moreButton).attr("type", "button");
    $(moreButton).text("More");
    outputHTML.append(moreButton);
  }

  function displayMoreSongs (songArray) {
    require(['hbs!../templates/songs'], function(songTemplate) {
      $("#moreButton").before(songTemplate(songArray));
    });
  }

  $(document).on("click", "#moreButton", function() {
    getMoreSongs.getMoreSongs(displayMoreSongs);  ///// Call displayMoreSongs
  });

  $(document).on("click", "#deleteButton", function(){
    $(this).parent().parent().remove();
  });
});

