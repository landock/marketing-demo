require "digest"

def create_checksum_hash(file_name_array)
  checksum_hash = {}
  file_name_array.each do |file_name|
    checksum_hash[file_name] = Digest::MD5.hexdigest File.read file_name
  end

  checksum_hash
end
