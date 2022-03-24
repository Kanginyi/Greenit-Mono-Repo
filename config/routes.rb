Rails.application.routes.draw do
  
   resources :users
   resources :blogs
   resources :comments

   # Login Session, Create => Login Action, Destroy => Logout Action
   post "/signup", to: "users#create"
   get "/me", to: "users#show"

   post "/login", to: "sessions#create"
   delete "/logout", to: "sessions#destroy"

   # Blog related like actions
   get "/blogs/likes/:id", to: "blogs#get_likes"

   patch "/inc_likes/:id", to: "blogs#increment_likes"
   patch "/inc_dislikes/:id", to: "blogs#increment_dislikes"

   patch "/dec_likes/:id", to: "blogs#decrement_likes"
   patch "/dec_dislikes/:id", to: "blogs#decrement_dislikes"

   # Comment related like actions
   get "/comments/likes/:id", to: "comments#get_likes"

   patch "/inc_comment_likes/:id", to: "comments#increment_likes"
   patch "/inc_comment_dislikes/:id", to: "comments#increment_dislikes"

   patch "/dec_comment_likes/:id", to: "comments#decrement_likes"
   patch "/dec_comment_dislikes/:id", to: "comments#decrement_dislikes"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
