# Welcome to my DishList app!

![screencapture-localhost-3001-2025-07-03-08_31_56](https://github.com/user-attachments/assets/f6a324ea-4424-4b03-a75e-eb131131daec)
![screencapture-localhost-3001-2025-07-03-08_33_07](https://github.com/user-attachments/assets/c22f0c19-5fc0-4d0c-9d35-008d95e70e93)
![screencapture-localhost-3001-2025-07-03-08_32_49](https://github.com/user-attachments/assets/57d88383-a019-42f5-99e5-00c5e4bf9c52)


Here you can view all application users! When you click on their favorite food, a recipe appears for that meal!

# The steps to run the app are as follows:

## 1. Set up the backend (Ruby on Rails API)

### Navigate to the backend folder:

`cd backend`

### Install the required gems:

`bundle install`

### Set up the database:

`rails db:create`
`rails db:migrate`
`rails db:seed`

### Start the Rails server:

`rails s`

## 2. Set up the frontend (React + TypeScript)

### Navigate to the frontend folder:

`cd frontend`

### Install the dependencies:

`npm install`

### Start the React development server:

`npm start`

The app will be running on http://localhost:3001.

## Testing

### Backend

Tests for the Rails API are located in spec/requests/. To run tests:
`bundle exec rspec`

### Frontend

Tests for React components are located in the same folder as the components in the src/components directory. For example:

src/components/UserForm/UserForm.test.ts

To run the frontend tests:
`npm test`
