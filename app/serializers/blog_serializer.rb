class BlogSerializer < ActiveModel::Serializer
  attributes :id, :title, :blog_post, :image_url, :likes, :dislikes
  has_one :user
end
