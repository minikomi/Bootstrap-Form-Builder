require File.expand_path("../rack_static_host", __FILE__)

use ::Rack::TryStatic,
  :root => "public",
  :urls => ["/"],
  :try  => [".html", "index.html"]

run lambda { [404, {"Content-Type" => "text/plain"}, ["File not found!"]] }
