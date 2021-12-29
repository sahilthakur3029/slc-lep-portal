## Welcome to the Language Exchange Program's Web Portal - a React + Flask based application developed for the Student Learning Center at UC Berkeley.
Created by Sahil Thakur. Questions can be sent to sahilthakur@berkeley.edu.

This file provides a general workflow in regards to the different routes on the website as well as directions for local setup. 
The application is currently hosted on Heroku utilizing a Heroku PostgreSQL remote database. The application's homepage can be found at https://slc-application.herokuapp.com/
### Public Routes:
The routes available are divided into two categories. The first of which are public routes which contain forms open to anyone on the internet to access. They are described as follows:

1.  **`/`**: This is default page of the web portal that directs to the Intake Form. This is where students are able to fill information about themselves so that they can be entered in the Language Exchange Program's pairing pool. The Intake Form is divided into 7 portions: 

    - *Introduction & Orientation Verification*:
    - *Basic Information*:
    - *Language Preferences*:
    - *Partner Preferences*:
    - *Waiver*:
    - *Confirmation*:
    - *Success*:

2.   **`/timesheet`**: This page is where students can log their conversation hours within their respective pair or trio on a weekly basis.

### Protected/Admin Routes:
The second category of routes, protected/admin routes, can only be accessed via Google OAuth for authorized email addresses manually added to the remotely managed database for the application. Any unauthorized accesses to these routes will result in a redirect to the admin sign-in page. The purpose of these routes are for the admin of the application to manage the student pool and pair students accordingly. They are described as follows:  

1.  **`/signin`**: This is the default redirect page if an unauthorized user tries to access any of the protected/admin routes below. This page allows for an admin to sign-in to the application through their authorized Google email address.
2.  **`/adminhome`**:
3.  **`/formpairs`**: 
4.  **`/paired`**:
5.  **`/unpaired`**:
6.  **`/studentlist`**:
7.  **`/timesheetlogs`**:
8.  **`/settings`**:

### Setup:

### Ports Used:
- React Client: `http://localhost:3000`
- Flask Server: `http://localhost:5000`
  
