class BlogSerializer < ActiveModel::Serializer
  attributes :id, :title, :blog_post, :image_url, :likes, :dislikes, :created_at
  has_one :user
  has_many :comments
end
