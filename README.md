# Task-Tracker-API
## This task tracker requires users to register an account and make requests using token authorization. The user can login and perform basic CRUD for tracking their tasks.
### Main functions include: registration, add task, update task, delete task, list task

Technologies used: express.js, MongoDB, bcrypt, jsonwebtokens

For local setup, a MongoDB database is needed for storage of users and their assigned tasks. A secret for the JWT creation needs to be defined as well as a specified port. An example .env is provided but will need to be copied, updated, and renamed to '.env'. For installing the node modules, npm install will be required. To run the project, use node server.js.

Required environment variables: 

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/myDatabase
PORT=3000
JWT_SECRET=your_super_secret_key_here
DATABASE_NAME=myDatabase
```

API routes required: 
* GET - Check API status- /api/health
* POST - Register user - /api/auth/register
* POST - Log in user - /api/auth/login
* GET - Get tasks - /api/tasks
* POST - Create task - /api/tasks
* PUT - Update task - /api/tasks/:id
* DELETE - Delete task - /api/tasks/:id

For testing, Thunder Client or another API testing tool to test the API routes using basic HTTP requests. For task routes, the bearer token from the auth routes will be required in the authorization header.
For future reference, email verification, sharable tasks, and task deadlines can be implemented for a more complete task tracker. 
