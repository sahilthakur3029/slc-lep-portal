## Welcome to the Language Exchange Program's Online Web Portal - an application developed for the Student Learning Center at UC Berkeley.
Created by Sahil Thakur. Questions can be sent to sahilthakur@berkeley.edu.

This file provides a general workflow in regards to the different routes on the website as well as directions for local setup. 
The application is currently hosted on Heroku and the application's homepage can be found at https://slc-application.herokuapp.com/
### Routes:
The routes below are divided into student facing routes and admin facing routes. The student facing routes are forms available for anyone on the internet to access and submit, provided that they have a valid @berkeley.edu email address. The admin facing routes are also protected and can only be accessed by authorized email addresses manually added to the remotely managed database for the application. Any unauthorized accesses to these routes will result in a redirect to the admin sign-in page.  

1.  **`/`**: This route is a student facing route and the default redirect of the web portal that leads to the Intake Form.

### Setup:

### Ports Used:
- React Client: localhost:3000
- Flask Server: localhost:5000
