define(function() {
  return {
    getSongs: function (callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", 'https://fiery-fire-5905.firebaseio.com/.json');
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          callback.call(this, data);
        }
      };
    }
  };
});