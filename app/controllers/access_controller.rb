class AccessController < ApplicationController

  def index
    gon.fbid = ENV['SKETCHPHRASE_FBID']
  end
end
