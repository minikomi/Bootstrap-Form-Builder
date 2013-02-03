require.config({
  paths: {
    jquery: 'lib/jquery'
    underscore: 'lib/underscore',
    backbone: 'lib/backbone'
    bootstrap: 'lib/bootstrap'
  }

});

require([
        'app',
], function(App){
  App.initialize();
});
