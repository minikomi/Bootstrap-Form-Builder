#Bootstrap Form Builder

##What's this?

A Drag-and-drop form builder for [twitter bootstrap](http://twitter.github.com/bootstrap/). 

Currently using `v. 2.3.1` :dolphin:

##Where can I see it in action?

It's hosted on github pages [here](http://minikomi.github.io/Bootstrap-Form-Builder/).

###Notes

* For development & debugging change the data-main for the require script tag in `index.html` 
  to point at `assets/js/main.js`. (Look just before the closing `<body>` tag!)

* Once done, change it back to  build for production using the `build.js` script in the `assets/js/lib`
  folder and [r.js](https://github.com/jrburke/r.js/). Then revert to `assets/js/main-built.js`

* The full command is `r.js -o assets/js/lib/build.js` which should be run from the base directory.

