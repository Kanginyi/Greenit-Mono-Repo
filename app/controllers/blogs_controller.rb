class BlogsController < ApplicationController

   get "/blogs" do
      blogs = Blog.all
      blogs.to_json
   end

   get "/blogs/:id" do
      blog = Blog.find(params[:id])
      blog.to_json
   end

   post "/blogs" do
      user = User.find_by(username: params[:username]) || User.create(username: params[:username])
      blog = user.blogs.create(
         user_id: params[:user_id],
         title: params[:title],
         content_post: params[:content_post],
         image_url: params[:image_url],
         likes: params[:likes],
         dislikes: params[:downvotes]
      )
      blog.to_json
   end

   # Upvotes
   patch "/blogs/:id/edit/likes" do
      likes = Blog.find(params[:id])
      likes.update(likes: params[:likes])
      likes.to_json
   end

   # Downvotes
   patch "/blogs/:id/edit/dislikes" do
      dislikes = Blog.find(params[:id])
      dislikes.update(dislikes: params[:dislikes])
      dislikes.to_json
   end

   delete "/blogs/:id" do
      blog = Blog.find(params[:id])
      blog.destory
      blog.to_json
   end

end
