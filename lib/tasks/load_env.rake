require "dotenv"
require_relative "logging"

desc "Load .env file"
task :load_env do |t|
  include Logging
  pathToEnvFile = "#{pwd}/.env"
  Dotenv.load(pathToEnvFile)
  logger.info(t.name) { "#{pathToEnvFile} file loaded!\n" }
end
