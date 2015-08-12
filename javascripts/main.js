requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'lodash': '../bower_components/lodash/lodash.min',
    'firebase': '../bower_components/firebase/firebase',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access"], 
  function ($, _, _firebase, Handlebars, bootstrap, dom) {
  var outputHTML = dom.getOutputElement();
  var myFirebaseRef = new Firebase("https://fiery-fire-5905.firebaseio.com/");
  myFirebaseRef.child('songs').on("value", function(snapshot) {
    var songs = snapshot.val();
    allSongsArray = [];
    for (var obj in songs) {
      allSongsArray.push(songs[obj]);
    }
    displaySongData(allSongsArray);
    
    var titleArray = [],
        artistArray = [],
        albumArray = [],
        genreArray = [];

    for (var item in allSongsArray) {
      titleArray.push(allSongsArray[item].songName);
      artistArray.push(allSongsArray[item].artistName);
      albumArray.push(allSongsArray[item].albumName);
      genreArray.push(allSongsArray[item].genre);
    }

    var songDataArrays = {
      titleArray: titleArray, 
      artistArray: artistArray, 
      albumArray: albumArray,
      genreArray: genreArray
    };
    populateForm(songDataArrays);
  });

 function displaySongData (songsArray) {
    require(['hbs!../templates/songs'], function(songTemplate) {
      $(outputHTML).html("");
      $(outputHTML).prepend(songTemplate(songsArray));
    });
  }

  function populateForm(input) {
    require(['hbs!../templates/form-dropdown-artist', 'hbs!../templates/form-dropdown-album'], 
    function(artistTemplate, albumTemplate) {
      var artists = _.uniq(input.artistArray).sort();
      var albums = _.uniq(input.albumArray).sort();
      $("#artist-dropdown").append(artistTemplate(artists));
      $("#album-dropdown").append(albumTemplate(albums));
      $('#artist-dropdown').change(function(){
        var artistSelected = $("#artist-dropdown").val();
        var albumsNarrowed = _.uniq(_.pluck(_.filter(allSongsArray, {artistName: artistSelected}), 'albumName'));
        console.log(albumsNarrowed);
        console.log(albumTemplate(albumsNarrowed));
        $("#album-dropdown :enabled").remove();
        $("#album-dropdown").append(albumTemplate(albumsNarrowed)); 
      });
    });
  }

  $(document).on("click", "#deleteButton", function(){
    $(this).parent().parent().hide();
  });

  $(document).on("click", "#filterButton", function() {
    var artistFilter = $("#artist-dropdown").val();
    var albumFilter = $("#album-dropdown").val();
    var genreFilter = $("#genre-checkbox :checked").map(function() {
        return $(this).val();
      }).get();
    $('.media').hide();
    $('.media :contains(' + artistFilter + '):contains(' + albumFilter + ')').parent().show();
    if(!artistFilter) {
      $('.media :contains(' + albumFilter + ')').parent().show();
    }
    if(!albumFilter) {
      $('.media :contains(' + artistFilter + ')').parent().show();
    }
    for(var i = 0; i < genreFilter.length; i++) {
      var val = genreFilter[i];
      var item = $('.media :contains(' + val + ')');
      if(item) {
        item.parent().show();
      }
    }
  });
});