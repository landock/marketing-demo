require "logger"

module Logging
  class << self
    def logger
      logger_formatter = Proc.new do |severity, datetime, progname, msg|
        date_format = datetime.strftime("%Y-%m-%d %H:%M:%S")

        puts msg

        "[#{date_format}][#{severity}][#{progname}]: #{msg}\n"
      end

      @logger ||= Logger.new("Rakefile.log", "weekly", formatter: logger_formatter)
    end

    def logger=(logger)
      @logger = logger
    end
  end

  def self.included(base)
    class << base
      def logger
        Logging.logger
      end
    end
  end

  def logger
    Logging.logger
  end
end
