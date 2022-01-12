class SessionsController < ApplicationController

   def create
      user = User.find_by(username: params[:username])
      session[:user_id] = user.id
      render json: user
   end

   def destroy
      user = current_user
      if user
         logout!
         render json: {message: "See you later! :^)"}, status: :no_content
      else
         render json: ["Who is this???"], status: :not_found
     end
   end

end