class User < ApplicationRecord
   has_many :comments
   has_many :blogs

   validates :username,                      :session_token, presence: true
                        # :password_digest,
   validates :username, uniqueness: true, length: {maximum: 30}

   # This will create a session token if it doesn't already exist, related to the private method further down on Line 33
   before_validation :ensure_session_token

   # This lets us access our password later
   def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
   end

   # If this hash and the login action hash are the same/return true, then we know the password is right and we can continue!
   def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
   end
 
   # Reset the session token; everytime the user logs in or out, this will reset the session token
   def reset_session_token!
      generate_session_token
      self.save!
      self.session_token
   end
   

   private

   # Look at Line 9, this will create a session token if it already doesn't exist
   def ensure_session_token
      self.session_token ||= generate_session_token
   end

   # Using this inside of generate_session_token right underneath here, helps create a new RANDOM session token each time a user logs in/out
   def self.new_session_token
      SecureRandom.urlsafe_base64(64)
   end
   
   def generate_session_token
      # Call and invoke the method on Line 38
      # Set the session_token to a new token; Even though session tokens are random, users could POTENTIALLY have the same ones
      self.session_token = self.class.new_session_token

      # To make sure we don't have the same session_token as others, we're going to be looking for any User that has the same session_token as the generated one
      # Then we'll continuallyt rsset ours UNTIL we have one that doesn' match anyone else's in our database
      while User.find_by(session_token: self.session_token)
         self.session_token = self.class.new_session_token
      end

      # Finally after all this work, return our new session token!!
      self.session_token
   end

end
