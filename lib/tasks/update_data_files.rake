require_relative "logging"

include Logging
desc "Update contentful and shopify data files"
task :update_data_files => [:load_env, :run_middleman_contentful, :update_images_in_data_files] do |t|
  trap("SIGINT") do
    exit
  end
  logger.info(t.name) { "Done!" }
end
