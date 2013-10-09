#!/usr/bin/env ruby

require "rubygems"
require "json"
require "yaml"

yamlfiles = Dir.glob("#{ File.dirname(__FILE__) }/*.yaml")

yamlfiles.each{ |file|

  puts(file)
  yaml = YAML.load_file(file)
  json = JSON.pretty_generate(YAML.load_file(file))
  File.open(file.gsub("\.yaml", "\.json"), 'w'){ |out| puts "writing #{out.path}"; out.write(json) }
}
