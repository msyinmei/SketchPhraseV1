OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['SKETCHPHRASE_FBID'], ENV['SKETCHPHRASE_FBSECRET']
end