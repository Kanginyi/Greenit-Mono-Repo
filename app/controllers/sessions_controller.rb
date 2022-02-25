class SessionsController < ApplicationController

   def create
      user = User.find_by(username: params[:username])

      if user&.authenticate(params[:password])
         session[:user_id] = user.id
         render json: user
      else
         render json: {error: "Who is this? Invalid username or password >:^("}, status: :unauthorized
      end

      # session[:user_id] = user.id
      # render json: user
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

   # def destroy
   #    session.delete :user_id
   #    head :no_content
   # end

end

# def create
#    user = User.find_by(username: session_params[:username])

#    if user && user.authenticate(session_params[:password])
#       login!
#       render json: user, status: :ok
#    else
#       render json: {errors: "Who is this? No such user exists."}, status: :not_found
#    end

#    # session[:user_id] = user.id
#    # render json: user
# end

# def destroy
#    user = current_user
#    if user
#       logout!
#       render json: {message: "See you later! :^)"}, status: :no_content
#    else
#       render json: ["Who is this???"], status: :not_found
#   end
# end


# private

# def session_params
#    params.require(:user).permit(:username, :password)
# end
# end