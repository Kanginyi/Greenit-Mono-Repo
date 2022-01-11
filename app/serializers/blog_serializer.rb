class BlogSerializer < ActiveModel::Serializer
  attributes :id, :title, :blog_post, :image_url, :upvotes, :downvotes
  has_one :greeniter
end
