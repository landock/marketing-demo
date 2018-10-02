require_relative "logging"
require_relative "./upload_file"
require_relative "./create_checksum_hash"
require_relative "./create_aws_objects_hash"

include Logging

desc "Upload files that have changed"
task :upload_recently_changed_files, [:bucket, :distribution_id] do |t, args|
  Dir.chdir "build"

  files_array = Dir.glob "**/*.*"
  file_checksum_hash = create_checksum_hash files_array
  s3_files_hash = create_aws_objects_hash
  skipped_file_count = 0

  file_checksum_hash.each do |file_name, md5_hash|
    if s3_files_hash[file_name] != md5_hash
      upload_file file_name, args.bucket
    else
      skipped_file_count += 1
    end
  end

  should_run_invalidation = skipped_file_count != files_array.length

  if should_run_invalidation
    Rake::Task["create_invalidation"].invoke args.distribution_id
  else
    logger.info(t.name) { "No files were changed, so nothing was uploaded." }
  end
end
