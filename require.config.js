require.config({
  // baseUrl: "./app",
  shim: {

  },
  paths: {
    almond: "app/libs/almond/almond",
    backbone: "app/libs/backbone/backbone",
    fastclick: "app/libs/fastclick/lib/fastclick",
    handlebars: "app/libs/handlebars/handlebars",
    jquery: "app/libs/jquery/dist/jquery",
    requirejs: "app/libs/requirejs/require",
    underscore: "app/libs/underscore/underscore",
  },
  packages: [

  ]
});

require(['app/main']);
