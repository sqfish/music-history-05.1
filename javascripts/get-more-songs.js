define(function() {
  return {
    getMoreSongs: function (callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", 'javascripts/songs2.json');
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          callback.call(this, data.songs);
        }
      };
    }
  };
});