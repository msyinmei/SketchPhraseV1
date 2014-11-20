OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, 'process.env.SKETCHPHRASE_FBID', 'process.env.SKETCHPHRASE_FBSECRET'
end