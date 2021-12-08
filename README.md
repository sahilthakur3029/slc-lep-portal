## Welcome to the Language Exchange Program's Online Web Portal - a React + Flask based application developed for the Student Learning Center at UC Berkeley.
Created by Sahil Thakur. Questions can be sent to sahilthakur@berkeley.edu.

This file provides a general workflow in regards to the different routes on the website as well as directions for local setup. 
The application is currently hosted on Heroku utilizing a Heroku PostgreSQL remote database. The application's homepage can be found at https://slc-application.herokuapp.com/
### Public Routes:
The routes available are divided into two categories. The first of which are public routes which contain forms open to anyone on the internet to access. They are described as follows:

1.  **`/`**: This default page of the web portal that leads to the Intake Form.
2.   **`/timesheet`**:

### Protected/Admin Routes:
The second category of routes, protected/admin routes, can only be accessed by authorized email addresses manually added to the remotely managed database for the application. Any unauthorized accesses to these routes will result in a redirect to the admin sign-in page. They are described as follows:  

1.  **`/signin`**: 
2.  **`/adminhome`**:
3.  **`/formpairs`**: 
4.  **`/paired`**:
5.  **`/unpaired`**:
6.  **`/studentlist`**:
7.  **`/timesheetlogs`**:
8.  **`/settings`**:

### Setup:

### Ports Used:
- React Client: localhost:3000
- Flask Server: localhost:5000
  
