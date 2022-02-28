class UsersController < ApplicationController

   def index
      users = User.all
      render json: users, status: :ok
   end

   def show
      if current_user
         render json: current_user, status: :ok
      else
         render json: {error: "No current active session."}, status: :unauthorized
      end
   end

   def create
      user = User.create(user_params)
      if user.valid?
         session[:user_id] = user.id
         render json: user, status: :created
      else
         render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
      end
   end

   def update
      user = User.find_by(id: params[:id])
      user.update(user_params)
      if user.valid?
         render json: user, status: :ok
      else
         render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
      end
   end

   def destroy
      user = User.find_by(id: params[:id])
      if user
         user.destroy
         render json: {message: "User successfully deleted!"}, status: :no_content
      else
         render json: {error: "User not found :^("}, status: :not_found
      end
   end

   private

   def user_params
      # params.require(:user).permit(:username, :password)
      params.permit(:username, :password)
   end

end
