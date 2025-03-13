# Create admin user
admin = User.create!(
  email: 'admin@example.com',
  password: 'password',
  role: 'admin'
)

# Create advanced user
advanced = User.create!(
  email: 'advanced@example.com',
  password: 'password',
  role: 'advanced'
)

# Create basic user
basic = User.create!(
  email: 'basic@example.com',
  password: 'password',
  role: 'basic'
)

# Create some customers
customers = []
10.times do |i|
  customers << Customer.create!(
    name: Faker::Company.name,
    email: Faker::Internet.email,
    phone: Faker::PhoneNumber.phone_number,
    address: Faker::Address.full_address
  )
end

puts "Seed data created successfully!"
