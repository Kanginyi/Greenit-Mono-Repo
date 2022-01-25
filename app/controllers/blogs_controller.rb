class BlogsController < ApplicationController

   def index
      blogs = Blog.all
      render json: blogs, status: :ok
   end

   def show
      blog = Blog.find_by(id: params[:id])
      if blog
         render json: blog, status: :ok
      else
         render json: {errors: "Greenit Post not found :^("}, status: :not_found
      end
   end

   def create
      new_blog = Blog.create(blog_params)
      if new_blog.valid?
         render json: new_blog, status: :created
      else
         render json: {errors: new_blog.errors.full_messages}, status: :unprocessable_entity
      end
   end

   def update
      blog = Blog.find_by(id: params[:id])
      blog.update(blog_params)
      if blog.valid?
         render json: blog, status: :ok
      else
         render json: {errors: blog.errors.full_messages}, status: :unprocessable_entity
      end
   end

   def destroy
      blog = Blog.find_by(id: params[:id])
      if blog
         blog.destroy
         render json: {message: "Greenit Post successfully deleted!"}, status: :no_content
      else
         render json: {error: "Greenit Post not found :^("}, status: :not_found
      end
   end

   # Likes and Dislikes related things
   def increment_likes
      blog = Blog.find_by(id: params[:id])
      if blog
         blog.update(likes: blog.likes + 1), status: :ok
         render json: blog
      else
         render json: {message: "Greenit Post not found :^("}, status: :not_found
      end
   end

   def increment_dislikes
      blog = Blog.find_by(id: params[:id])
      if blog
         blog.update(likes: blog.likes + 1), status: :ok
         render json: blog
      else
         render json: {message: "Greenit Post not found :^("}, status: :not_found
      end
   end

   def decrement_likes
      blog = Blog.find_by(id: params[:id])
      if blog
         blog.update(likes: blog.likes - 1), status: :ok
         render json: blog
      else
         render json: {message: "Greenit Post not found :^("}, status: :not_found
      end
   end

   def decrement_dislikes
      blog = Blog.find_by(id: params[:id])
      if blog
         blog.update(likes: blog.likes - 1), status: :ok
         render json: blog
      else
         render json: {message: "Greenit Post not found :^("}, status: :not_found
      end
   end

   private

   def blog_params
      params.permit(:user_id, :title, :blog_post, :image_url, :likes, :dislikes)
   end

end
