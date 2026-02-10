# 🧠 Quiz App (React 19)

A fully responsive and modern Quiz Application built using **React 19 + Vite**. The app loads quiz questions from JSON, allows users to attempt quizzes, calculates scores, and displays results and leaderboard data. This project is ideal for learning React fundamentals, routing, state management, and deployment.

This README contains **everything in one place** — project info, packages, setup, structure, workflow, and deployment.

---

# 📌 About The Project

This Quiz App demonstrates:

- Component-based architecture  
- Context API for global state management  
- Client-side routing with React Router  
- JSON-based quiz data handling  
- Bootstrap responsive UI  
- Production-ready deployment setup  

The project can easily be extended with backend APIs, authentication, timers, and database storage.

---

# 🚀 Features

- Start quiz from home page  
- Multiple-choice questions  
- Score calculation logic  
- Result summary screen  
- Leaderboard page  
- Mobile responsive UI  
- Clean Bootstrap styling  
- Fast performance using Vite  
- Simple and scalable architecture  
- Easy deployment  

---

# 📦 Dependencies

dependencies:

  "bootstrap": "^5.3.8"  
  "react": "^19.2.0"  
  "react-bootstrap-icons": "^1.11.6"  
  "react-dom": "^19.2.0"  
  "react-router-dom": "^7.10.1"  

---

# 📘 Package Purpose

- react & react-dom → Core libraries for building UI  
- react-router-dom → Navigation & routing  
- bootstrap → Responsive layout & styling  
- react-bootstrap-icons → UI icons  

---

# 🛠️ Local Setup (Step-by-Step)

1️⃣ Clone Repository  
git clone https://github.com/your-username/quiz-app.git  

2️⃣ Enter Project Folder  
cd quiz-app  

3️⃣ Install Dependencies  
npm install  

4️⃣ Run Development Server  
npm run dev  

5️⃣ Open in Browser  
http://localhost:5173  

Your app is now running locally 🎉

---

# 📁 Folder Structure (Explanation)

public/ → Static files and base HTML  
src/assets/ → Global styles, fonts  
src/components/ → Reusable components  
src/context/ → Quiz state management  
src/data/ → JSON quiz questions  
src/hooks/ → Custom hooks  
src/images/ → Image assets  
src/pages/ → Home, Quiz, Result, Leaderboard  
App.jsx → Routing setup  
main.jsx → React entry file  
vite.config.js → Vite configuration  

---

# 🧩 App Flow (How It Works)

- User opens Home page  
- Clicks Start Quiz  
- Questions load from JSON  
- Answers stored in Context  
- Score calculated on submit  
- Result page shows score  
- Leaderboard shows rankings  

---

# 🏗️ Production Build

Create optimized production build:

npm run build  

Output folder:  
dist/  

This folder is used for deployment.

---

# 🌍 Deployment Guide

## 🚀 Deploy on Vercel

Dashboard Method:

- Push project to GitHub  
- Login to Vercel  
- Click Add New Project  
- Import repository  
- Vercel auto-detects Vite  
- Click Deploy  
- Done ✅  

CLI Method:

npm i -g vercel  
vercel  

Follow CLI prompts.

---

## 🚀 Deploy on Render

- Push code to GitHub  
- Login to Render  
- Click New → Static Site  
- Connect repository  
- Configure:  

  Build Command: npm run build  
  Publish Directory: dist  

- Click Deploy ✅

---

# 🔮 Future Improvements

- Timer-based quizzes  
- Quiz categories  
- Backend leaderboard  
- Authentication system  
- Dark mode  
- Multi-language support  
- Admin dashboard  
- API-based questions  
- Database integration  

---

# 📜 License

MIT License — free to use and modify.

---

# 👨‍💻 Author

Your Name  
GitHub: https://github.com/your-username  

---

# ⭐ Support

If you like this project:

- Star the repo  
- Fork it  
- Share it  

Happy Coding 🚀
