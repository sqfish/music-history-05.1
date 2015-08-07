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
  populateSongs.getSongs(populateForm);

  function populateForm(songsObject) {
    require(['hbs!../templates/form-dropdown-artist', 'hbs!../templates/form-dropdown-album'], 
    function(artistTemplate, albumTemplate) {
      console.log(songsObject);
      $("#artist-dropdown").append(artistTemplate(songsObject));
      $("#album-dropdown").append(albumTemplate(songsObject));
    });
  }

  function displaySongData (songsObject) {
    require(['hbs!../templates/songs'], function(songTemplate) {
      $(outputHTML).html("");
      // displayMoreButton(outputHTML); 
      $(outputHTML).prepend(songTemplate(songsObject));
    });
  }

  // function displayMoreButton(playlistHTML) {
  //   var moreButton = document.createElement("BUTTON");
  //   moreButton.id = "moreButton";
  //   $(moreButton).attr("type", "button");
  //   $(moreButton).text("More");
  //   outputHTML.append(moreButton);
  // }

  // function displayMoreSongs (songsObject) {
  //   require(['hbs!../templates/songs'], function(songTemplate) {
  //     $("#moreButton").before(songTemplate(songsObject));
  //     populateForm(songsObject);
  //   });
  // }

  // $(document).on("click", "#moreButton", function() {
  //   getMoreSongs.getMoreSongs(displayMoreSongs);  ///// Call displayMoreSongs
  // });

  $(document).on("click", "#deleteButton", function(){
    $(this).parent().parent().remove();
  });


var songData = {
  songs: {},
  displayData: function(){},
  displayMoreData: function(){},
  updateDropdowns: function(){},
  updateSongObject: function(){}
};

$(document).on("click", "#filterButton", function() {
  var artistFilter = $("#artist-dropdown").val();
  var albumFilter = $("#album-dropdown").val();
  var genreFilter = $("#genre-checkbox :checked").map(function() {
    return $(this).val();
  }).get();
  console.log(genreFilter);
  $('.media').hide();
  $('.media :contains(' + artistFilter + ')').parent().show();
  // $(".media:not(:contains(' + artistFilter + '))").hide();
  $('.media :contains(' + albumFilter + ')').parent().show();

  
  for(var i = 0; i < genreFilter.length; i++) {
    var val = genreFilter[i];
    var item = $('.media :contains(' + val + ')');
    if(item) {
      item.parent().show();
    }
  }
  // $('option:contains(' + artistFilter + ')').remove();
});



});