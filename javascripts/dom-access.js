define(["jquery"],function($) {
  var $output = $("#right-panel");

  return {
    getOutputElement: function() {
      return $output;
    }
  };
});
