require.config({
  shim: {

  },
  paths: {
    almond: "../bower_components/almond/almond",
    fastclick: "../bower_components/fastclick/lib/fastclick",
    handlebars: "../bower_components/handlebars/handlebars",
    jquery: "../bower_components/jquery/dist/jquery",
    requirejs: "../bower_components/requirejs/require",
    underscore: "../bower_components/underscore/underscore",
    app: "../app",
    backbone: "../bower_components/backbone/backbone"
  },
  packages: [

  ]
});

requirejs(['app/main']);