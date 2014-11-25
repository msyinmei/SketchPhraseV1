class GamesController < ApplicationController
  # UNCOMMENT BEFORE PRODUCTION
  # before_action :confirm_logged_in

	def index
    gon.fbid = ENV['SKETCHPHRASE_FBID']
    @user = User.find(session[:user_id])
    @games = @user.games
    @game = @games.last
    # @game = Game.find_all_by_user_id(session[:user_id]).last
    @players_count = @game.players_count
	end

  def create
    @game = Game.new
    if @game.save
      if session[:user_id]
        @game.user_id = session[:user_id]
        @game.players_count = params[:players_count]
        @game.save
      end
      redirect_to games_path
    end
  end

end
