class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :full_name, presence: true
  validates :favorite_food_title, presence: true
  validates :favorite_food_id, presence: true
end
