desc "Changes urls of images in certain directories"
task :update_images_in_data_files => [:download_contentful_images, :change_image_paths_in_data_files]
