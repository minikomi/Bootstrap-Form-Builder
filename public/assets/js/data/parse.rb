#!/usr/bin/env ruby

require "json"
require "yaml"

yamlfiles = Dir.glob("./*.yaml")

yamlfiles.each{ |file|
  yaml = YAML.load_file(file)
  json = JSON.pretty_generate(YAML.load_file(file))
  File.open(file.gsub("yaml", "json"), 'w'){ |out| out.write(json) }
}
