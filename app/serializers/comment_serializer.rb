class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment_text, :user_id, :created_at
  has_one :blog
  has_one :user
end
