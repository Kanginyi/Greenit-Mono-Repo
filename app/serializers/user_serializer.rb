class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :created_at, :blogs, :comments
  has_many :blogs
  has_many :comments
end
