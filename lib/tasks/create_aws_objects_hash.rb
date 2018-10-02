require "aws-sdk"

def create_aws_objects_hash()
  s3 = Aws::S3::Resource.new(region: ENV["AWS_REGION"])
  staging_bucket = ENV["STAGING_BUCKET"]
  s3_map = {}

  resp = s3.client.list_objects_v2 bucket: staging_bucket

  all_content = resp.contents

  while resp.is_truncated
    resp = s3.client.list_objects_v2 bucket: staging_bucket, continuation_token: resp.next_continuation_token
    all_content.concat resp.contents
  end

  all_content.each do |obj|
    s3_map[obj.key] = obj.etag.delete '\"'
  end

  s3_map
end
