class CommentsController < ApplicationController

   get "/comments" do
      comments = Comment.all
      comments.to_json
   end

   get "/comments/:id" do
      comment = Comment.find(params[:id])
      comment.to_json
   end
   
end
