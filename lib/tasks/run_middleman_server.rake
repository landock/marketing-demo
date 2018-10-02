require_relative "logging"
include Logging

desc "Starts the middleman server"
task :run_middleman_server do |t|
  logger.info(t.name) { "middleman started" }
  logger.info(t.name) { exec "bundle exec middleman server" }
end
