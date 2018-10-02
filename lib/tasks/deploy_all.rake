
namespace :deploy do
  namespace :staging do
    desc "Deploy all files to staging"
    task :all => [:build] do |t|
      Rake::Task[:upload_all_files].invoke(*ENV["STAGING_BUCKET"])
      Rake::Task[:create_invalidation].invoke(*ENV["STAGING_DISTRIBUTION_ID"])
    end
  end
  namespace :production do
    desc "Deploy all files to production"
    task :all => [:build] do |t|
      Rake::Task[:upload_all_files].invoke(*ENV["PRODUCTION_BUCKET"])
      Rake::Task[:create_invalidation].invoke(*ENV["PRODUCTION_DISTRIBUTION_ID"])
    end
  end
end
