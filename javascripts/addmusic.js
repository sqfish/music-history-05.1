var genre;
$(".genre").click(function(){
  genre = $(this).val();
  console.log(genre);
});

$("#addMusicButton").click(function(){
  var songName = document.getElementById("songNameInput").value;
  var artistName = document.getElementById("artistNameInput").value;
  var albumName = document.getElementById("albumNameInput").value;



 
  var thingie = {
  "songName": songName,
  "artistName": artistName,
  "albumName": albumName,
  "genre": genre
  };

  $(document).ready(function(){
    $.ajax({
      data: JSON.stringify(thingie),
      url: "https://fiery-fire-5905.firebaseio.com/songs.json",
      method: "POST",
    }).done(function(thingie) {
      console.log("thingie", thingie);
    });
  });
});