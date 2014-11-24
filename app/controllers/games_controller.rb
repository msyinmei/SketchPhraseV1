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
    session[:players_count] = params[:players_count]
    redirect_to game_path(@game)
  end

  def show

  end

end
