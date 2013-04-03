#Bootstrap Form Builder

Hosted on github pages [here](http://minikomi.github.com/Bootstrap-Form-Builder).

Drag and drop form builder for twitter bootstrap.

Everything is in /public.

You can build this for production using the `build.js` script in the `assets/js/lib`
folder and [r.js](https://github.com/jrburke/r.js/).

Use this command from the base directory to build it: `r.js -o assets/js/lib/build.js`

Then change the require line in `index.html` to point at `assets/lib/main-built.js`.
