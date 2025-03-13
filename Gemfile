source "https://rubygems.org"

ruby "3.2.2"  # Use your Ruby version

# Rails framework
gem "rails", "~> 7.1.2"
gem "sprockets-rails"
gem "pg", "~> 1.1"
gem "puma", "~> 6.0"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"
gem "redis", "~> 4.0"
gem "bootsnap", require: false

# Authentication
gem "devise"

# Authorization
gem "pundit"

# UI
gem "bootstrap", "~> 5.3.0"
gem 'sassc-rails'

# Pagination
gem "kaminari"

# Seed data
gem "faker"

group :development, :test do
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end
