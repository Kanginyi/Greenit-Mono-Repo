class CommentsController < ApplicationController

   def index
      comments = Comment.all
      render json: comments, status: :ok
   end

   def show
      comment = Comment.find_by(id: params[:id])
      if comment
         render json: comment, status: :ok
      else
         render json: {errors: "Comment not found :^("}, status: :not_found
      end
   end

   def create
      new_comment = Comment.create(comment_params)
      if new_comment.valid?
         render json: new_comment, status: :created
      else
         render json: {errors: new_comment.errors.full_messages}, status: :unprocessable_entity
      end
   end

   def update
      comment = Comment.find_by(id: params[:id])
      comment.update(comment_params)
      if comment.valid?
         render json: comment, status: :ok
      else
         render json: {errors: comment.errors.full_messages}, status: :unprocessable_entity
      end
   end

   def destroy
      comment = Comment.find_by(id: params[:id])
      if comment
         comment.destroy
         render json: {message: "Comment successfully deleted!"}, status: :no_content
      else
         render json: {error: "Comment not found :^("}, status: :not_found
      end
   end

   #Likes and Dislikes related things
   def get_likes
      comment = Comment.find_by(id: params[:id])
      render json: comment
   end

   def increment_likes
      comment = Comment.find_by(id: params[:id])
      comment.update(likes: comment.likes + 1)
      render json: comment
   end

   def increment_dislikes
      comment = Comment.find_by(id: params[:id])
      comment.update(dislikes: comment.dislikes + 1)
      render json: comment
   end

   def decrement_likes
      comment = Comment.find_by(id: params[:id])
      comment.update(likes: comment.likes - 1)
      render json: comment
   end

   def decrement_dislikes
      comment = Comment.find_by(id: params[:id])
      comment.update(dislikes: comment.dislikes - 1)
      render json: comment
   end

   # get "/comments/likes/:id", to: "comments#get_likes"

   # patch "/inc_comment_likes/:id", to: "comments#increment_likes"
   # patch "/inc_comment_dislikes/:id", to: "comments#increment_dislikes"

   # patch "/dec_comment_likes/:id", to: "comments#decrement_likes"
   # patch "/dec_comment_dislikes/:id", to: "comments#decrement_dislikes"

   private

   def comment_params
      params.permit(:comment_id, :user_id, :blog_id, :comment_text, :likes, :dislikes)
   end

end
