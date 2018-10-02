require_relative "./upload_file"

desc "Upload all files"
task :upload_all_files, [:bucket] do |t, args|
  Dir.chdir "build"
  files_array = Dir.glob "**/*.*"
  files_array.each do |file_name|
    upload_file file_name, args.bucket
  end
end
