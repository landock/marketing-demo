require_relative "logging"
include Logging

desc "Builds the middleman content"
task :build_middleman_content do |t|
  logger.info(t.name) { "Building content..." }
  logger.info(t.name) { system "bundle exec middleman build" }
end
