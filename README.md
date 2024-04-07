# E Learning API
## Project Overview: E Learning

This project enables users to learn online what he want to learn also we have integrated AI where user can chat with api and ask the question solution and also they enroll with course here is the admin section they can add update and delete the course and also for notification we have given the mail notification:

### User Sign and Signup
1. User can sigup and sign with the plateform.
2. here is the admin can also signin and signup withe course.
3. also they can update their profile details and password as well.

### AI-Powered Chatbot:

1. Integration of an AI chatbot enables users to interact with the platform using natural language.
2. The chatbot provides instant responses to queries, assists in finding courses, and offers solutions to problems.

#### Course Enrollment:

1. Users can easily enroll in courses of their choice.
2. The enrollment process is streamlined and user-friendly.

### Admin Section:

1. An admin panel is provided for managing the platform.
2. Admins can add new courses, update existing ones, and remove outdated content.

### Mail Notifications:

1. Users receive notifications via email for important updates such as course enrollment confirmations, Registration and forget password key.
2. Email notifications help in keeping users engaged and informed about platform activities.

### User Profiles:

1. Each user has a profile where they can track their enrolled courses and search their course and get aal course list.

## Installation
Install My Projects Using npm
```bash
    git clone https://github.com/amit-vis/e-learning_API.git
    npm install
    cd e-learning_API
```

## Running Test
To run tests, run the following command
```bash
    npm start
```

## Endpoints and Actions:
* /user/create: Create a new user/admin account.
* /user/login: Sign in into existing account.
* /user/update/:id: Update the user details.
* /user/view/:id: get the user details lists.

* /ask/user-chat: user can chat with AI and resolve your general queries.
* /ask/admin-chat: admin can chat with AI and resolve your general queries.

* /course/create/: only admin add new course.
* /course/update/:id: only admin update the course.
* /course/delete/:id: only admin delete the course.
* /course/viewcourse-admin: admin get all the course.
* /course/viewcourse-user: user get all the course.
* /course/viewfilter-user: user get filtered course.
* /course/viewfilter-admin: admin get filtered course.

* /enroll/:id: User enroll with the course.
* /enroll/view: User get enroll course.
* /enroll/delete/:courseId: user remove the enrolled courses.

* /token/create/:id: create the token for update the password.
* /token/set-password: set the password with the token.

## Folder Structure
* config
    - chatAi.js
    - cloudinary.js
    - passport-jwt.js
    - database.js
    - errorHandler.js
    - invalidRoutesMiddleware.js
    - logger.js
    - mailers.js
    - passport-jwt-admin.js
* controllers
    - chatAi_controller.js
    - course_controller.js
    - home_controller.js
    - enrollment_controller.js
    - user_controller.js
    - token_controller.js
* models
    - courses.js
    - enrollment.js
    - user.js
    - token.js
* routes
    - chatAI.js
    - course.js
    - index.js
    - user.js
    - enroll_course.js
    - token.js
- index.js
- .gitignore
- combine.log
- error.log
- index.js
- package-lock.json
- package.json