require "aws-sdk"

require_relative "logging"

include Logging

def create_invalidation(distribution_id)
  logger.info(__method__) { "Creating invalidation" }
  cloudfront = Aws::CloudFront::Client.new()
  resp = cloudfront.create_invalidation distribution_id: distribution_id, invalidation_batch: {paths: {quantity: 1, items: ["/*"]}, caller_reference: "middlman-deploy-#{Time.now.to_i}"}
  logger.info(__method__) { resp }
end
