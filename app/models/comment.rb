class Comment < ApplicationRecord
  belongs_to :blog
  belongs_to :greeniter
end
