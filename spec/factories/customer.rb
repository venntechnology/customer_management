FactoryBot.define do
  factory :customer do
    name { "Test Customer" }
    email { "customer@example.com" }
    phone { "555-1234" }
    address { "123 Test St" }
  end
end
