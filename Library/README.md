## 📚 Library Admin Panel – Full Stack MERN Application

This project is a complete Library Management Admin Panel built using the MERN stack (MongoDB, Express, React, Node.js). It is designed for library administrators to manage the entire library system digitally, including authors, categories, books, members, and book issue/return records. The system includes secure authentication, file uploads, email support, PDF receipt generation, and dashboard analytics.

This is a production-style admin panel that demonstrates real-world full-stack architecture and CRUD operations.

The system supports full CRUD (Create, Read, Update, Delete) functionality for:

• Authors  
• Categories  
• Books  
• Members  
• Book Issues & Returns  
• Admin Profile Management  
• Dashboard Statistics  

It also includes authentication and protected routes so only logged-in admins can access the system.

────────────────────────────

TECH STACK USED

Backend (Server Side):

• Node.js – runtime environment  
• Express.js – API server  
• MongoDB + Mongoose – database and ORM  
• JWT (jsonwebtoken) – authentication  
• bcrypt – password hashing  
• multer – file uploads (book covers, profiles)  
• nodemailer – email sending  
• puppeteer – PDF receipt generation  
• joi + validator – data validation  
• dotenv – environment config  
• cors – cross-origin support  
• ejs – template rendering (for receipts)

Frontend (Client Side):

• React – UI library  
• Axios – API requests  
• React Router – routing/navigation  
• React Hook Form – form handling  
• Zod – validation schema  
• React Query – server state & caching  
• React Table – advanced tables  
• Bootstrap – UI styling  
• Bootstrap Icons – icons  
• React Hot Toast – notifications  
• React Select – advanced dropdowns

────────────────────────────

BACKEND FEATURES

• Secure Admin Registration & Login  
• JWT Protected Routes  
• Author Management  
• Category Management  
• Book Management with Cover Upload  
• Member Management with Profile Upload  
• Book Issue & Return Tracking  
• Dashboard Analytics  
• Email Support  
• PDF Receipt Download  
• Active/Inactive Record Handling

All APIs are protected using authentication middleware.

────────────────────────────

FRONTEND FEATURES

• Modern responsive admin UI  
• Dashboard overview  
• Forms with validation  
• Data tables with sorting/filtering  
• Toast notifications  
• File upload support  
• API integration with caching  
• Clean admin workflow

────────────────────────────

LOCAL DEVELOPMENT SETUP

1) Clone the project and install backend dependencies:

npm install

2) Create a .env file in backend root and configure:

PORT=5000  
MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret  
JWT_EXPIRE=7d  
ACCESS_TOKEN_SECRET=secret  
REFRESH_TOKEN_SECRET=secret  
SMTP_HOST=smtp_host  
SMTP_PORT=smtp_port  
EMAIL_SECURE=false  
EMAIL_USER=your_email  
EMAIL_PASSWORD=your_password  

3) Start backend server:

npm run dev

Backend runs on:
http://localhost:5000

4) Setup frontend:

npm install  
npm run dev

Frontend runs on:
http://localhost:5173

5) Configure Axios base URL in frontend:

http://localhost:5000/api

────────────────────────────

PRODUCTION / SERVER DEPLOYMENT

Backend can be deployed on:

• Render  
• Railway  
• VPS (DigitalOcean/AWS)  
• Cyclic

Database:

• MongoDB Atlas (recommended)

Frontend can be deployed on:

• Vercel  
• Netlify

Example Production URLs:

Frontend:
https://library-admin.vercel.app

Backend API:
https://library-api.onrender.com

Update Axios base URL to production API URL after deployment.

────────────────────────────

WHY THIS PROJECT IS GOOD

This project demonstrates:

• Real-world CRUD system  
• Secure authentication flow  
• File handling  
• Email integration  
• PDF generation  
• Admin dashboard design  
• Full-stack architecture  
• API design best practices

It is ideal for portfolio, learning, or as a base for a real library system.

────────────────────────────

FUTURE IMPROVEMENTS (OPTIONAL)

• Role-based access (Super Admin, Staff)  
• Fine/penalty calculation  
• Reports & analytics  
• Audit logs  
• Multi-library support  
• Dark mode UI

────────────────────────────

This project is a strong example of a real-world full-stack admin panel and can be extended into a production-ready system.
