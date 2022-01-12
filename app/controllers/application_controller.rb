class ApplicationController < ActionController::API
   include ActionController::Cookies
   include ActionController::Helpers

   # Check if this person is logged in or not/Checks if there's a session_token active in this instance
   helper_method :current_user, :logged_in?


   private

   def current_user
      # Return nil UNLESS this session token is found
      return nil unless session[:session_token]
      # We only really need this if we're logging in; if you're already logged in, then we don't need to run this because @current_user will already exist
      @current_user ||= User.find_by(session_token: session[:session_token])
   end

   def logged_in?
      # Don't forget that the double bang operator returns a Boolean value; If this returns true, someone's logged in|If not, then no one's logged in
      !!current_user
   end

   # Here we're trying to login
   def login!(user)
      # The session token will get reset to a new one
      user.reset_session_token!
      # Then you get assigned a new session_token
      session[:session_token] = user.session_token
      # Your login credentials then get set to @current_user
      @current_user = user
   end

   # Here we're logging out
   def logout!
      # The session token will get reset to a new one
      current_user.reset_session_token!
      # Then the session_token gets set to nil, essentially gets "erased"
      session[:session_token] = nil
      # There's no more @current_user, because you logged out
      @current_user = nil
   end

   def require_logged_in
      # If the current_user is nil or false, we'll run this error
      unless current_user
         # Renders this error if the current_user doesn't exist => LATA FISH
         render json: { base: ["Invalid Credentials"] }, status: :unauthorized
      end
   end

end
