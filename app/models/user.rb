class User < ApplicationRecord
   has_many :comments, dependent: :destroy
   has_many :blogs, dependent: :destroy

   has_secure_password

   # validates :username, :password_digest, :session_token, presence: true
   validates :username, :password_digest, presence: true
   validates :username, uniqueness: true, length: {maximum: 30}

end
