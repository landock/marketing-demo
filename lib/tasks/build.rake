require_relative "logging"
include Logging

task :build => [:load_env, :build_middleman_content] do |t|
  trap("SIGINT") do
    exit
  end
  logger.info(t.name) { "Build done!" }
end
