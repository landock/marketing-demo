require "aws-sdk"
require "mime-types"

require_relative "logging"
include Logging

def upload_file(file_name, bucket)
  s3 = Aws::S3::Resource.new(region: ENV["AWS_REGION"])
  s3_obj = s3.bucket(bucket).object(file_name)
  mime_type = "application/octet-stream"
  fiveGb = 5368709120

  if MIME::Types.type_for("#{file_name}").first
    mime_type = MIME::Types.type_for("#{file_name}").first.content_type
  end

  upload_successful = s3_obj.upload_file file_name, acl: "public-read", content_type: mime_type, multipart_threshold: fiveGb
  if upload_successful
    logger.info(__method__) { "Uploaded: #{s3_obj.public_url} successfully" }
  else
    logger.error(__method__) { "failed for whatever reason" }
  end
end
