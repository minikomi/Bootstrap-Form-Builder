define( function(require) {
   var formname = require('text!app/templates/snippet/original/formname.html')
   , prepend = require('text!app/templates/snippet/input/prepend.html')
   , search = require('text!app/templates/snippet/input/search.html')
   , textinput = require('text!templates/snippet/input/textinput.html');

  return {
    formname: formname,
    prepend: prepend,
    search: search,
    textinput: textinput
  }
});
