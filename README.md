# Marketing Demo

Super sick marketing site...

## Installation

```
yarn install
bundle install --path vendor/bundle
```

## Static Site Generator

Middleman 4: https://middlemanapp.com

## Frontend Framework

Bootstrap v4: https://getbootstrap.com

## CMS

Contentful: https://www.contentful.com/

## SCSS Lint

Linter config: https://github.com/brigade/scss-lint#config

## Run locally

Visible @ http://localhost:4567

```
rake serve - Starts the middleman server with correct environment
```

## Build

```
rake build - Build the content using the latest data files from Contentful
```

## Deploy

```
rake deploy:staging:recent - Deploy recently changed files to staging
```

```
rake deploy:staging:all - Deploy all files to staging
```

```
rake deploy:production:recent - Deploy recently changed files to production
```

```
rake deploy:production:all - Deploy all files to production
```

## Other Rake Tasks

```
rake load_env - Load .env file
```

```
rake build_middleman_content - Builds the middleman content
```

```
rake change_image_paths_in_data_files - Change image paths in data files
```

```
rake create_invalidation[distribution_id] - Create invalidation
```

```
rake download_contentful_images - Download images found in Contentful data files
```

```
rake run_middleman_contentful - Runs the middleman contentful gem
```

```
rake run_middleman_server - Starts the middleman server
```

```
rake update_data_files - Update contentful and shopify data files
```

```
rake update_images_in_data_files - Changes urls of images in data directory
```

```
rake upload_all_files[bucket] - Upload all files
```

```
rake upload_recently_changed_files[bucket,distribution_id] - Upload files that have changed
```
