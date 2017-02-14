all:
	cd assets/js/data/yaml && ./parse.rb
	r.js -o assets/js/lib/build.js
