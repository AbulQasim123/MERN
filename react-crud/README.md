## ⚡ React + Vite CRUD App Guide

This project is a simple and modern CRUD (Create, Read, Update, Delete) application built using React and Vite. It allows users to add new records, view a list of records, update existing data, and delete records. The app uses JSON Server as a mock REST API to simulate a real backend, making it ideal for learning and frontend development practice.

This CRUD app demonstrates real-world concepts like API integration, form handling, validation, routing, and UI component usage.

The project uses the following main dependencies:

- react & react-dom → Core React library for building UI
- axios → For making HTTP requests to the API
- react-router-dom → For page navigation and routing
- react-hook-form → For managing forms efficiently
- yup → Schema-based form validation
- @hookform/resolvers → Connects Yup with React Hook Form
- primereact → Ready-to-use UI components
- primeflex → Utility CSS library for layout
- primeicons → Icon library for UI
- json-server → Mock backend to simulate REST API

To run the project locally, first install all dependencies:

npm install

Then start the React development server:

npm run dev

The React app will start on:
http://localhost:5173

This project requires JSON Server to run as a backend. Create a file named db.json in the root folder and add sample data like this:

{
"users": [
{ "id": 1, "name": "John Doe", "email": "john@test.com" }
]
}

Now start JSON Server:

npx json-server --watch db.json --port 3001

Your API will be available at:
http://localhost:3001

Typical API endpoints used in this CRUD app:

GET /users → Fetch all users  
GET /users/:id → Fetch single user  
POST /users → Create new user  
PUT /users/:id → Update user  
DELETE /users/:id → Delete user

Make sure Axios is configured correctly in your project:

axios.defaults.baseURL = "http://localhost:3001";

Important deployment note: JSON Server cannot be deployed on Vercel because Vercel does not support long-running Node servers or persistent storage. If deploying your frontend on Vercel, host JSON Server separately on platforms like Render, Railway, or Cyclic, and update the Axios base URL to the live API.

This project is great for learning CRUD operations, API handling, and modern React development workflow.
