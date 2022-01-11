class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment_text
  has_one :blog
  has_one :user
end
