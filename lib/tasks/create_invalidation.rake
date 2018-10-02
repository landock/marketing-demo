require_relative("./create_invalidation")

desc "Create invalidation"
task :create_invalidation, [:distribution_id] do |t, args|
  create_invalidation args.distribution_id
end
