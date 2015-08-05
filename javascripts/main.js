requirejs(["dom-access", "populate-songs", "get-more-songs"], 
  function (dom, populateSongs, getMoreSongs){
  var outputHTML = dom.getOutputElement();


populateSongs.getSongs(displaySongData); //Display song data


function displaySongData (songArray) {
  outputHTML.html("");
  for (var i = 0; i < songArray.length; i++) {
    var song = songArray[i];
    var newSong = createNewSongElement(song); ///////// Call createNewSongElement
    outputHTML.append(newSong);
  }
  displayMoreButton(outputHTML);    // Call displayMoreButton
}

function displayMoreButton(playlistHTML) {
  var moreButton = document.createElement("BUTTON");
  moreButton.id = "moreButton";
  $(moreButton).attr("type", "button");
  $(moreButton).text("More");
  outputHTML.append(moreButton);
}


function displayMoreSongs (songArray) {
  for (var i = 0; i < songArray.length; i++) {
      var song = songArray[i];
      var newSong = createNewSongElement(song);   //////Call createNewSongElement
      $("#moreButton").before(newSong);
  }
}

$(document).on("click", "#moreButton", function(){
  getMoreSongs.getMoreSongs(displayMoreSongs);  ///// Call displayMoreSongs
});

$(document).on("click", "#deleteButton", function(){
  $(this).parent().parent().remove();
});


function createNewSongElement (song) {
  var playlistHTML = document.getElementById("right-panel");
  var newMedia = document.createElement("DIV");
  newMedia.className = "media";
  var newMediaL = document.createElement("DIV");
  newMediaL.className = "media-left media-top";
  var newSpan = document.createElement("SPAN");
  newSpan.className = "glyphicon glyphicon-play media-object";
  $(newSpan).attr("aria-hidden", "true");
  newMediaL.appendChild(newSpan);
  newMedia.appendChild(newMediaL);
  var newSong = document.createElement("DIV");
  newSong.className = "media-body";
  var newHeader = document.createElement("H3");
  newHeader.className = "media-heading";
  var newSongParagraph = document.createElement("P");
  var newDeleteButton = document.createElement("BUTTON");
  $(newDeleteButton).attr("type", "button");
  $(newDeleteButton).html("<span aria-hidden='true'>&times;</span>");
  newDeleteButton.id = "deleteButton";
  newDeleteButton.className = "close";
  $(newDeleteButton).attr("aria-hidden", "close");
  newSong.appendChild(newHeader);
  newSong.appendChild(newSongParagraph);
  newSong = updateSongElement(song, newSong); /////// Call updateSongElement
  $(newSong).prepend(newDeleteButton);
  newMedia.appendChild(newSong);
  return newMedia;
}

//
// Update a single song element with information from a song object
// Accepts an existing song object and an existing song element
// Returns updated song element
//
function updateSongElement(song, songHTML) {
  var songName = song.songName;
  var artistName = song.artistName;
  var albumName = song.albumName;
  var songHeader = songHTML.firstElementChild;
  var songParagraph = songHTML.lastElementChild;
  songHeader.innerHTML = songName;
  songParagraph.innerHTML = artistName + " | " + albumName + " | " + "Genre";
  return songHTML;
}

});