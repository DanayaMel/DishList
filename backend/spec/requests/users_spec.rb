require 'rails_helper'

RSpec.describe "Users API", type: :request do
  # Create 3 users using FactoryBot
  let!(:users) { FactoryBot.create_list(:user, 3) }
  let(:user_id) { users.first.id }

  describe "GET /users" do
    it "returns all users" do
      get "/users"

      # Check the response status and the number of users returned
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(3)
    end
  end

  describe "POST /users" do
    let(:valid_attributes) do
      {
        full_name: "Jane Doe",
        email: "jane@example.com",
        favorite_food_title: "Pizza",
        favorite_food_id: "111"
      }
    end

    context "with valid data" do
      it "creates a user" do
        expect {
          post "/users", params: { user: valid_attributes }
        }.to change(User, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)["email"]).to eq("jane@example.com")
      end
    end

    context "with invalid data" do
      it "returns errors" do
        post "/users", params: { user: { full_name: "" } }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to have_key("errors")
      end
    end
  end

  describe "PUT /users/:id" do
    let(:updated_attributes) { { user: { full_name: "Updated Name" } } }

    it "updates the user" do
      put "/users/#{user_id}", params: updated_attributes
      expect(response).to have_http_status(:ok)

      # Ensure that the user was updated in the database
      expect(User.find(user_id).full_name).to eq("Updated Name")
    end
  end

  describe "DELETE /users/:id" do
    it "deletes the user" do
      expect {
        delete "/users/#{user_id}"
      }.to change(User, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
