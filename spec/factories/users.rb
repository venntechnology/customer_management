FactoryBot.define do
  factory :user do
    sequence(:email) { "user@example.com" }
    password { "password" }
    role { "basic" }

  end
end

