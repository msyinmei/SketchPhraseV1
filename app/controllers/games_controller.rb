class GamesController < ApplicationController
  # UNCOMMENT BEFORE PRODUCTION
  # before_action :confirm_logged_in

	def index
	end

  def create
    @game = Game.new
    if session[:user_id]
      @game.user_id = session[:user_id]
    end
    @players = params[:players_id]
    redirect_to games_path
  end

end
