FactoryBot.define do
  factory :user do
    full_name { "Test User" }
    email { Faker::Internet.email }
    favorite_food_title { "Sushi" }
    favorite_food_id { "123" }
  end
end
