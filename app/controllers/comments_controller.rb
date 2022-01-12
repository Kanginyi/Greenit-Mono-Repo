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

   
   private

   def comment_params
      params.permit(:blog_id, :user_id, :comment_text)
   end

end
