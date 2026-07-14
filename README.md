# Task Tracker Full-Stack Application

## Project Description
The Task Tracker is a full-stack web application that allows users to create an account, log in, and manage their personal tasks. The application uses a React frontend that communicates with an Express.js backend connected to MongoDB. Authentication is handled using JSON Web Tokens (JWT), ensuring that users can only access and manage their own tasks.

## Technologies Used

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Tokens (JWT)
* bcryptjs
* dotenv
* CORS

## Features

* User registration
* User login with JWT authentication
* Protected task routes
* View all tasks
* Create new tasks
* Update existing tasks
* Delete tasks
* Password hashing
* MongoDB database integration
* Responsive React interface
* Loading and error messages
* Conditional rendering based on authentication status

## API Routes
* GET - Check API status- /api/health
* POST - Register user - /api/auth/register
* POST - Log in user - /api/auth/login
* GET - Get tasks - /api/tasks
* POST - Create task - /api/tasks
* PUT - Update task - /api/tasks/:id
* DELETE - Delete task - /api/tasks/:id

## Running Instructions
### Backend 
For running, using a PowerShell terminal, change directories into the backend folder. Then, run `npm start` in the command line.
### Frontend
For running, using a PowerShell terminal, change directories into the frontend/vite-project folder. Then, run `npm run dev` in the command line.

## Required environment variables 

For local setup, a MongoDB database is needed for storage of users and their assigned tasks. A secret for the JWT creation needs to be defined as well as a specified port. An example .env is provided but will need to be copied, updated, and renamed to '.env'.
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/myDatabase
PORT=3000
JWT_SECRET=your_super_secret_key_here
DATABASE_NAME=myDatabase
```

## Possible Improvements 
To improve upon this task tracker API, shareable links to the tracker for team contributions would be helpful. Additionally, adding support for importing and exporting tasks to make task migration simpler. 
