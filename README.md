# 🍽️ DishList

A full-stack web app where users can view a list of people and discover recipes based on their favorite foods.

![Screenshot 1](screenshots/screenshot1.png)
![Screenshot 2](screenshots/screenshot2.png)
![Screenshot 3](screenshots/screenshot3.png)

---

## 🚀 Features

- View a list of all application users
- Click on a user’s favorite dish to get a live recipe
- Simple, interactive interface
- Built with a React + TypeScript frontend and a Ruby on Rails API backend

---

## 🧰 Tech Stack

- **Frontend**: React (TypeScript)
- **Backend**: Ruby on Rails API
- **Testing**: RSpec (backend), React Testing Library (frontend)

---

## 🛠️ Getting Started

### 1. Backend Setup (Ruby on Rails)

```bash
cd backend
bundle install
rails db:create
rails db:migrate
rails db:seed
rails s
```

### 2. Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Visit [http://localhost:3001](http://localhost:3001) to view the app.

---

## ✅ Running Tests

### Backend (RSpec)

```bash
cd backend
bundle exec rspec
```

### Frontend (React Testing Library)

Tests are co-located with components, e.g.:
```
src/components/UserForm/UserForm.test.ts
```

To run all frontend tests:

```bash
cd frontend
npm test
```

---

## 🧾 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♀️ Author

**Danaya Melendez**  
[github.com/DanayaMel](https://github.com/DanayaMel)
