require_relative "logging"
include Logging

desc "Runs the middleman contentful gem"
task :run_middleman_contentful do |t|
  logger.info(t.name) { "Updating data....." }
  logger.info(t.name) { `bundle exec middleman contentful` }
end
