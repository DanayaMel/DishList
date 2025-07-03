Welcome to my Application Users app!

Here you can view all application users! When you click on their favorite food, a recipe appears for that meal!

# The steps to run the app are as follows:

# 1. Set up the backend (Ruby on Rails API)

## Navigate to the backend folder:

`cd backend`

## Install the required gems:

`bundle install`

## Set up the database:

`rails db:create`
`rails db:migrate`
`rails db:seed`

## Start the Rails server:

`rails s`

# 2. Set up the frontend (React + TypeScript)

## Navigate to the frontend folder:

`cd frontend`

## Install the dependencies:

`npm install`

## Start the React development server:

`npm start`

The app will be running on http://localhost:3001.

# Testing

## Backend

Tests for the Rails API are located in spec/requests/. To run tests:
`bundle exec rspec`

## Frontend

Tests for React components are located in the same folder as the components in the src/components directory. For example:

src/components/UserForm/UserForm.test.ts

To run the frontend tests:
`npm test`
