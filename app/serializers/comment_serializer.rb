class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment_text, :user_id
  has_one :blog
  has_one :user
end
