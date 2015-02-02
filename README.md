#Bootstrap Form Builder

## Warning: Currently using Bootstrap `v. 2.3.1` :dolphin:  (Not Bootstrap 3 ready.)

##What's this?

A Drag-and-drop form builder for [twitter bootstrap](http://twitter.github.com/bootstrap/). 

##Where can I see it in action?

It's hosted on github pages [here](http://minikomi.github.io/Bootstrap-Form-Builder/).

###Notes

* For development & debugging change the data-main for the require script tag in `index.html` 
  to point at `assets/js/main.js`. (Look just before the closing `<body>` tag!)

* Once done, change it back to  build for production using the `build.js` script in the `assets/js/lib`
  folder and [r.js](https://github.com/jrburke/r.js/). Then revert to `assets/js/main-built.js`

* The full command is `r.js -o assets/js/lib/build.js` which should be run from the base directory.

### Adding new form elements

* In the [js/data/ folder](https://github.com/minikomi/Bootstrap-Form-Builder/tree/gh-pages/assets/js/data/) are yaml files, each of which corresponds to a tab in the form builder.
* If you just want to add a new element you need to:
  - describe it in one of these files
  - parse the yaml to json using parse.rb in the same folder
  - create a corresponding template in the [templates/snippet directory](https://github.com/minikomi/Bootstrap-Form-Builder/tree/gh-pages/assets/js/templates/snippet)
  - add the template to [snippet-templates.js](https://github.com/minikomi/Bootstrap-Form-Builder/blob/gh-pages/assets/js/templates/snippet/snippet-templates.js)
* If you want to add a new tab, you'll also need to adjust the [app.js file](https://github.com/minikomi/Bootstrap-Form-Builder/blob/gh-pages/assets/js/app.js) to make sure the tab is loaded.

Don't forget to switch to main.js rather than main-built.js, or the changes you make before compiling with require.js won't show up!

What is different here?

I've added support for minimized components. When you are creating some forms over and over, you want to have them prepared. However they take a lot of space on the right side. So, I've added support for components to take little space on the right side, and auto expand when dragged to the form. 

How to make a component minimizable?

1) Add "minimized" property and set it to true in [js/data files](https://github.com/PavlovicDzFilip/Bootstrap-Form-Builder/blob/gh-pages/assets/js/data/), check file [minimizable.json](https://github.com/PavlovicDzFilip/Bootstrap-Form-Builder/blob/gh-pages/assets/js/data/minimizables.json) for example.

2) When creating html templates, type all the html code. Then surround the part you want to be hidden with 
<% if(!this.model.attributes.minimized) { %>
<hidden html code>
<% } %>

Check [js/templates/snippet/minimizedlogin.html](https://github.com/PavlovicDzFilip/Bootstrap-Form-Builder/blob/gh-pages/assets/js/templates/snippet/minimizedlogin.html) for example

3) That's it, everything should work now.
