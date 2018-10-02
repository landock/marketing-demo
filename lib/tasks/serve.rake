desc "Starts the middleman server with correct environment"
task :serve => [:load_env, :run_middleman_server] do
  trap("SIGINT") do
    exit
  end
end
