require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  # Creating a user with FactoryBot for use in the tests
  let!(:user) { FactoryBot.create(:user) }

  describe 'GET /users' do
    it 'returns all users' do
      get '/users'

      expect(response).to have_http_status(:ok)
      expect(response.body).to include(user.full_name)
    end
  end

  describe 'POST /users' do
    context 'with valid data' do
      let(:valid_attributes) { FactoryBot.attributes_for(:user) }

      it 'creates a new user' do
        expect {
          post '/users', params: { user: valid_attributes }
        }.to change(User, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(response.body).to include(valid_attributes[:full_name])
      end
    end

    context 'with invalid data' do
      let(:invalid_attributes) { FactoryBot.attributes_for(:user, full_name: nil) }

      it 'returns errors' do
        post '/users', params: { user: invalid_attributes }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("Full name can't be blank")
      end
    end
  end

  describe 'PUT /users/:id' do
    let(:updated_attributes) { { full_name: 'Updated Name' } }

    it 'updates the user' do
      put "/users/#{user.id}", params: { user: updated_attributes }

      user.reload  # Reload the user to get the updated values
      expect(user.full_name).to eq('Updated Name')
      expect(response).to have_http_status(:ok)
    end

    context 'with invalid data' do
      it 'returns errors' do
        put "/users/#{user.id}", params: { user: { full_name: nil } }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("Full name can't be blank")
      end
    end
  end

  describe 'DELETE /users/:id' do
    it 'deletes the user' do
      expect {
        delete "/users/#{user.id}"
      }.to change(User, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
