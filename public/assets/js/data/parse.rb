#!/usr/bin/env ruby

require "json"
require "yaml"

yamlfiles = Dir.glob("./*.yaml")

yamlfiles.each{ |file|
  json = YAML.load_file(file).to_json
  File.open(file.gsub("yaml", "json"), 'w') { |out| out.write(json) }
}
