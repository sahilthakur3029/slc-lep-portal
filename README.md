## Welcome to the Language Exchange Program's Web Portal - a React + Flask application developed for the Student Learning Center at UC Berkeley.
Created by Sahil Thakur. Questions can be sent to sahilthakur@berkeley.edu.

This file provides a general workflow in regards to the different routes on the website as well as directions for local setup. 
The application is currently hosted on Heroku utilizing a Heroku PostgreSQL remote database. The application's homepage can be found at https://slc-application.herokuapp.com/
### Public Routes:
The routes available are divided into two categories. The first of which are public routes which contain forms open to anyone on the internet to access. They are described as follows:

1.  **`/`**: This is the default page of the web portal that directs to the Intake Form. This is where students are able to fill information about themselves so that they can be entered in the Language Exchange Program's pairing pool. The Intake Form is divided into 7 portions: 

    - *Introduction & Orientation Verification*: The landing page of this form provides information about Language Exchange Program in addition to containing a field prompting the user to enter an orientation key. The purpose of this field is to ensure that a potential entrant to the Language Exchange Program has attended an orientation first, where the correct key will be provided. Without the correct key entered, the user cannot access the rest of the form. An admin to this application has the ability to change the orientation key in the admin portal.
    
    - *Basic Information*: This page asks the user for basic information about themselves including information about their name, email, academic title, residency, etc. One thing to note is that the user has to enter an email ending with @berkeley.edu otherwise they will be prompted to do as such and not allowed to continue the application. There is also a free-response area where the user has to answer what they hope gain from the LEP program and how they plan to meet with their potential partner weekly, which are also both mandatory fields (this is however checked for when the user submits the application at the end of the form). 
    
    - *Language Preferences*: This page prompts the user to enter languages they would want to practice and languages that they would want to learn. Each language can be marked as either a first choice or second choice, and the user needs to enter how proficient that they are in each respective language entered on a scale from 1-5. Lastly, this portion includes a field for any additional information that the user would want to include.
    
    - *Partner Preferences*: The partner preferences page is largely optional but it gives the user the option to enter information on whether they would prefer a partner studying a particular major or a partner with a particular gender as well as how important this is to them on a scale from 1-5. 
    
    - *Waiver*: This is a waiver set forward by the university that the user needs to acknowledged by entering the LEP program.
    
    - *Confirmation*: This page allows the user to see all the information that they have entered up to this point in the form as well as submit the form. Mandatory fields are marked with an asterisk and the user cannot submit if any of the fields with an asterisk are left blank. 
    
    - *Success*: This page confirms that the LEP program has received their information and that they can safely close their tab without loss of information.

2.   **`/timesheet`**: This page is where students can log their conversation hours within their respective pair or trio on a weekly basis.

### Protected/Admin Routes:
The second category of routes, protected/admin routes, can only be accessed via Google OAuth for authorized email addresses manually added to the remotely managed database for the application. Any unauthorized accesses to these routes will result in a redirect to the admin sign-in page to the admin portal. The purpose of these routes are for the admin of the application to manage the student pool and pair students accordingly. They are described as follows:  

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
  
