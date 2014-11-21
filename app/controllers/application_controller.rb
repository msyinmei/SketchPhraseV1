class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user


  private
  # Assign a current_user
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  # Ensure a user is logged in
  def confirm_logged_in
    unless session[:user_id] != nil
      redirect_to root_path
    end
  end

  # Prevent a user from going to another users page
  def prevent_user(user)
    if user.nil? or session[:user_id] != user.id
      redirect_to game_path
    end
  end

end
