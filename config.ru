require File.expand_path("../rack_static_host", __FILE__)

run lambda { |env|
  [
    200, 
  {
    'Content-Type'  => 'text/html', 
    'Cache-Control' => 'public, max-age=86400' 
  },
  File.open('public/index.html', File::RDONLY)
    ]
}
use ::Rack::TryStatic,
  :root => "public",
    :urls => ["/"],
      :try  => [".html", "index.html"]

      run lambda { [404, {"Content-Type" => "text/plain"}, ["File not found!"]] }
