class AddVegetarianToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :vegetarian, :boolean
  end
end
