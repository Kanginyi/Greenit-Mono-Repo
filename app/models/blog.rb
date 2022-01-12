class Blog < ApplicationRecord
   belongs_to :user
   has_many :comments

   validates :title, :blog_post, presence: true
end
