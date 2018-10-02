require "open-uri"

require_relative "logging"

include Logging

desc "Download images found in Contentful data files"
task :download_contentful_images => [:load_env] do |t|
  logger.info(t.name) { "Downloading images......" }
  mkdir("source/images/cms") unless File.exists?("source/images/cms")

  image_urls = []
  contentful_cdn_url = "https://cdn.contentful.com/spaces/#{ENV["CONTENTFUL_SPACE_ID"]}/assets?access_token=#{ENV["CONTENTFUL_CDAPI_ACCESS_TOKEN"]}&mimetype_group=image"

  open(contentful_cdn_url) do |contentful_url|
    data_hash = JSON.parse(contentful_url.read)
    image_urls = data_hash["items"].map do |item|
      "https:#{item["fields"]["file"]["url"]}"
    end
  end

  image_urls.each do |image_url|
    file_name = image_url.split("/").last
    current_index = image_urls.index(image_url) + 1
    total_image_urls = image_urls.length
    logger.info(t.name) { "Image #{current_index} of #{total_image_urls} saved: #{image_url}" }

    open(image_url) do |u|
      File.open("./source/images/cms/#{file_name}", "w+") do |ff|
        ff.write(u.read)
      end
    end
  end
end
