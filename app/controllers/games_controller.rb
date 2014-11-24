class GamesController < ApplicationController
  # UNCOMMENT BEFORE PRODUCTION
  # before_action :confirm_logged_in

	def index
    @players_count = @game.players_count
	end

  def create
    @game = Game.new
    if Game.save
      if session[:user_id]
        @game.user_id = session[:user_id]
      end
      @game.players_count = params[:players_count]
      redirect_to games_path(@game.id)
    end
  end

end
