# myapp.rb
require 'sinatra'
require 'firebase'
require 'htmlentities'

get '/' do
  erb :index
end



# Firebase
FB_Base_uri = 'https://solid-forms.firebaseio.com/'

FB_Firebase = Firebase::Client.new(FB_Base_uri)

post '/create' do
  markup = params[:markup]
  #puts markup
  response = FB_Firebase.push("forms", { :markup => markup })

  response.body['name']
end

get '/form/:id' do
  markup = FB_Firebase.get(FB_Base_uri + 'forms/' + params[:id])
  @markup = HTMLEntities.new.decode markup.body['markup']
  puts @markup
  erb :form
end
