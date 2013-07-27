({
  name: "almond",
  out: "../main-built.js"
  , shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: 'jQuery.fn.popover'
    }
  }
  , include: ['main']
  , paths: {
    app         : ".."
    , collections : "../collections"
    , data        : "../data"
    , models      : "../models"
    , helper      : "../helper"
    , templates   : "../templates"
    , views       : "../views"
    , main        : "../main"
  },
  wrap: true
  , insertRequire: ['main']
//  , optimize: 'none'
})
