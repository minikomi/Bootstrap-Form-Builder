define( function(require) {
  var formname = require('text!app/templates/snippet/formname.html')
  , prepend = require('text!app/templates/snippet/prependedtext.html')
  , search = require('text!app/templates/snippet/searchinput.html')
  , textinput = require('text!templates/snippet/textinput.html');

  return {
    formname: formname,
    prependedtext: prepend,
    searchinput: search,
    textinput: textinput
  }
});

