require_relative "logging"
include Logging

desc "Change image paths in data files"
task :change_image_paths_in_data_files do |t|
  logger.info(t.name) { "Update urls in yaml......" }
  Dir.glob("./data/*/*/*.yaml") do |yaml_file|
    yf = File.read(yaml_file)
    new_contents = yf.gsub(/\:url(.*)\//, ':url: "/images/cms/')

    File.open(yaml_file, "w") do |file|
      file.puts new_contents
    end
  end
end
