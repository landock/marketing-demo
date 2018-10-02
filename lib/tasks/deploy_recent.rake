namespace :deploy do
  namespace :staging do
    desc "Deploy recently changed files"
    task :recent => [:build] do |t|
      Rake::Task[:upload_recently_changed_files].invoke(*[ENV["STAGING_BUCKET"], *ENV["STAGING_DISTRIBUTION_ID"]])
    end
  end
  namespace :production do
    desc "Deploy recently changed files"
    task :recent => [:build] do |t|
      Rake::Task[:upload_recently_changed_files].invoke(*[ENV["PRODUCTION_BUCKET"], *ENV["PRODUCTION_DISTRIBUTION_ID"]])
    end
  end
end
