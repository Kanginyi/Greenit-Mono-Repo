Rails.application.routes.draw do
  
   resources :users
   resources :blogs
   resources :comments

   # Login Session, Create => Login Action, Destroy => Logout Action
   post "/signup", to: "users#create"
   get "/me", to: "users#show"

   post "/login", to: "sessions#create"
   delete "/logout", to: "sessions#destroy"

   get "/blogs/likes/:id", to: "blogs#get_likes"

   patch "/blogs/inc_likes/:id", to: "blogs#increment_likes"
   patch "/blogs/inc_dislikes/:id", to: "blogs#increment_dislikes"

   patch "/blogs/dec_likes/:id", to: "blogs#decrement_likes"
   patch "/blogs/dec_dislikes/:id", to: "blogs#decrement_dislikes"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
