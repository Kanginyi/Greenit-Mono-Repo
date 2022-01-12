class Comment < ApplicationRecord
   belongs_to :blog
   belongs_to :user

   validates :comment_text, presence: true
end
