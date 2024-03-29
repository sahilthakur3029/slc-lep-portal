## Welcome to the Language Exchange Program's Web Portal - a React + Flask application developed for the Student Learning Center at UC Berkeley.
Created by Sahil Thakur. Questions can be sent to sahilthakur@berkeley.edu.

This file provides a general workflow in regards to the different routes on the website as well as directions for local setup. 
The application is currently hosted on Heroku utilizing a Heroku PostgreSQL remote database. The application's homepage can be found at https://slc-application.herokuapp.com/


### Public Routes:
The routes available are divided into two categories. The first of which are public routes which contain forms open to anyone on the internet to access. They are described as follows:

1.  **`/`**: This is the default page of the web portal that directs to the Intake Form. This is where students are able to fill information about themselves so that they can be entered in the Language Exchange Program's pairing pool. The Intake Form is divided into 7 portions: 

    - *Introduction & Orientation Verification*: The landing page of this form provides information about the Language Exchange Program in addition to containing a field prompting the user to enter an orientation key. The purpose of this field is to ensure that a potential entrant to the Language Exchange Program has attended an orientation first, where the correct key will be provided. Without the correct key entered, the user cannot access the rest of the form. An admin to this application has the ability to change the orientation key within the admin portal.
    
    - *Basic Information*: This page asks the user for basic information about themselves including information about their name, email, academic title, residency, etc. One thing to note is that the user has to enter an email ending with @berkeley.edu otherwise they will be prompted to do as such and not allowed to continue the application. There is also a free-response area where the user is required to answer what they hope gain from the LEP program and how they plan to meet with their potential partner weekly, which are also both mandatory fields (this is however checked for when the user submits the application at the end of the form). 
    
    - *Language Preferences*: This page prompts the user to enter languages they would want to practice and languages that they would want to learn. Each language can be marked as either a first choice or second choice, and the user needs to enter how proficient that they are in each respective language entered on a scale from 1-5. Lastly, this portion includes a field for any additional information that the user would want to include.
    
    - *Partner Preferences*: The partner preferences page is largely optional but it gives the user the option to enter information on whether they would prefer a partner studying a particular major or a partner with a particular gender as well as how important this is to them on a scale from 1-5. 
    
    - *Waiver*: This is a waiver set forward by the university that the user needs to acknowledged by entering the LEP program.
    
    - *Confirmation*: This page allows the user to see all the information that they have entered up to this point in the form as well as submit the form. Mandatory fields are marked with an asterisk and the user cannot submit if any of the fields with an asterisk are left blank. 
    
    - *Success*: This page confirms that the LEP program has received their information and that the user can safely close their tab without loss of information.

2.   **`/timesheet`**: This page is where students can log their conversational hours within their respective pair or trio on a weekly basis.

### Protected/Admin Routes:
The second category of routes, protected/admin routes, can only be accessed via Google OAuth for authorized email addresses manually added to the remotely managed database for the application. Any unauthorized accesses to these routes will result in a redirect to the admin sign-in page to the admin portal. The purpose of these routes are for the admin of the application to manage the student pool and pair students accordingly. They are described as follows:  

1.  **`/signin`**: This is the default redirect page if an unauthorized user tries to access any of the protected/admin routes below. This page allows for an admin to sign-in to the application through their authorized Google email address.

2.  **`/adminhome`**: This is the homepage of the admin portal. If the admin is already logged in from a previous session and the browser caches google logins, this will be the default redirect when the sign-in page is accessed. This page contains buttons to access all the routes below as well as an option to sign out at the very end.

3.  **`/formpairs`**: This page allows for the pairing algorithm to be run in addition to selecting the strictness level of the pairing process from a scale of 1-3 when trios are formed. A strictness level of 1 is the most strict: this states that third person must match the exchange profile of someone in the pair. A strictness level of 2 states that the third person should have exchange language levels ±1 compared to pairs. A strictness level of 3 is the most lax: the third person just has to match exchange profile of pair. More details about how this algorithm works can be found in `server/routes/algorithm.py`

4.  **`/paired`**: This page contains an editable table containing rows where each row represents each pair or trio. In addition to containing a search bar to filter rows and a column chooser to filter columns located towards the top right of the screen, each row can be expanded by clicking the downwards arrow to provide information regarding any comments that were submitted through the intake form. Any changes made to the table will persist only if the save changes button is pressed.

5.  **`/unpaired`**: Page layout is the same as paired. The only difference is that each row of this table represents students that were not assigned a pair or trio during the last pairing process.

6.  **`/studentlist`**: Page layout is the same as paired. The only difference is that each row of this table represents all students that filled out the intake form.

7.  **`/timesheetlogs`**: Page layout is the same as paired. The only difference is that each row of this table represents all students that filled out the timesheet form.

8.  **`/timesheetlogsv2`**: This is another method of viewing the timesheet table. Instead of having one row per timesheet response (like in /timesheetlogs), this instead has one row per student and the columns being each week number of the program. Aggregates are performed on each row (total hours for each student in the program) and each column (total hours spent by students in the program per week).

9.  **`/settings`**: This page contains multiple configurations and the ability to download data for the application. Any changes only persist if the save changes button is clicked before leaving the page. Each section is described more thoroughly below:

    - *Intake Form / Timesheet Configurations*: This section allows for the semester display, the academic calendar link that shows up on the timesheet page, the orientation key, and the different weeks that can selected from in the timesheet page to be modified. In regard to the timesheet weeks, these are the weeks that show up in the timesheet page dropdown when submitting hours. The admin needs to only set a starting week number and an ending week number - the rest of the week numbers in between will be populated accordingly by the application.  
    
    - *Download Mail Merge Data*: This section allows for the pair and unpaired data to be downloaded in a CSV format such that Google Sheet's mail merge is able to send out emails.
    
    - *Download Table Data*: Each table's data can downloaded in a CSV in this section.
    
    - *Reset Algorithm*: This section contains a button that fully deletes data across all 4 tables (paired, unpaired, student list, and timesheet). The purpose of this section is to reset the application across different semesters. Since this is such a dangerous action, a popup appears when clicking this button to confirm intent. After both confirming intent and clicking save changes at the bottom of the page to persist changes, all data will then be deleted. It is advised to download all data before performing this action for record purposes.

### Local Setup:
- Ensure that you have python, node, pip, virtualenv, and postgres installed (recommended to use [homebrew](https://brew.sh/) to install these). If using homebrew to install postgres, confirm that the service is started by running `brew services` and if the service is stopped, run `brew services start postgres`
- After cloning the repo, cd into it and create and start a virtual environment by running `virtualenv -p python3 venv` and `source venv/bin/activate`
- Install all other necessary dependencies by running `pip3 install -r requirements.txt`
- Import a local copy of the database. This can be done utilizng the sample dump provided in the repo. To do this, run `createdb -T template0 slcapplication` and `psql slcapplication < sample_dump.sql`
- To run the Flask server, simply enter `flask run`
- To run the React client, cd in to the client directory. If this is the first time running the client, enter `npm install` to install the respective dependencies and then enter `npm start`. 
- The steps above should get the app started. To access the admin homepage from the client, an appropriate Gmail address needs to be whitelisted to complete the Google OAuth workflow from the sign in page. This can be done by adding an email address to the authusers table in the database. To do this, run `psql postgres` then `\c slcapplication` and `INSERT INTO authusers(id, email) VALUES (2, [YOUR EMAIL HERE]);`

### Ports Used:
- React Client: `http://localhost:3000`
- Flask Server: `http://localhost:5000`
  
