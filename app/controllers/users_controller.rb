class UsersController < ApplicationController

   def index
      users = User.all
      render json: users, status: :ok
   end
   
   def show
      user = User.find_by(id: params[:id])
      if user
         render json: user, status: :ok
      else
         render json: {errors: "User not found :^("}, status: :not_found
      end
   end

   def create
      new_user = User.create(user_params)
      if new_user.valid?
         render json: new_user, status: :created
      else
         render json: {errors: new_user.errors.full_messages}, status: :unprocessable_entity
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
      params.require(:user).permit(:username, :password)
   end

end
