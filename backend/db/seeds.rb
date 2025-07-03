# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

User.create!(
  full_name: "Alice Smith",
  email: "alice@example.com",
  favorite_food_title: "Beef Wellington",
  favorite_food_id: "52803"
)

User.create!(
  full_name: "Bob Jones",
  email: "bob@example.com",
  favorite_food_title: "Kidney Bean Curry",
  favorite_food_id: "52868"
)

User.create!(
  full_name: "Willis Jackson",
  email: "willis@example.com",
  favorite_food_title: "Chicken Marengo",
  favorite_food_id: "52920"
)

User.create!(
  full_name: "Lady Bird",
  email: "lady@example.com",
  favorite_food_title: "Ayam Percik",
  favorite_food_id: "53050"
)

User.create!(
  full_name: "Lily Flower",
  email: "lily@example.com",
  favorite_food_title: "Crispy Sausages and Greens",
  favorite_food_id: "52999"
)

User.create!(
  full_name: "Mia Rose",
  email: "mia@example.com",
  favorite_food_title: "Kung Pao Chicken",
  favorite_food_id: "52945"
)

User.create!(
  full_name: "DJ",
  email: "dj@example.com",
  favorite_food_title: "Piri-piri chicken and slaw",
  favorite_food_id: "53039"
)