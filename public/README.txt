=======================================
Team AKA Final Project: AKA Assignments
=======================================

*~~~~~~~~*
 Overview
*~~~~~~~~*

1. Description
2. Main Files
    a. HTML
        i. index.html
        ii. login.html
        iii. main.html
        iv. details.html
        v. addasignment.html
        vi. 404.html
    b. CSS
        i. styles.css
    c. JavaScript
        i. firebase.js
        ii. main.js
        iii. ultilities.js
        iv. classes.js
        v. listRow.js
        vi. details.js
        vii. addAssignments.js
        viii. autocomplete.js

*~~~~~~~~~~~~~~*
 1. Description
*~~~~~~~~~~~~~~*

Authors: Amirali Askari, Karel Chanivecky Garcia, Amy Jia Ying Tan

AKA Assignments is a group-moderated assignment tracker designed for BCIT Term 1 Downtown Campus Computer Systems Technoloy (CST) students.
Users are able to see an interactive list upon login and from there, they can view assignment details, add or edit assignments, and mark
assignments as completed.

*~~~~~~~~~~~~~*
 2. Main Files
*~~~~~~~~~~~~~*

The following sections will briefly describe each file.

*-------*
 a. HTML
*-------*

<---i. index.html--->
The index.html page is the landing page of the website. Within this file, you will find some HTML code that displays a title header, a sign-in
button, and a features description box.

<---ii. login.html--->
The login.html page is the login page of the website. Within this file, you will find HTML code for the login header with JS code to load the
firebase authentication sign-in box.

<---iii. main.html--->
The main.html page is the page that contains our interactive list for the website. Within this file, you will find code to create the headers of
the table as well as imported external JS files that will create the assignment list rows dynamically using the data from the database.

<---iv. details.html--->
The details.html page is the page where users can see the details of an assignment. Within this file, you will find code to create the sections
for the details as well as an external JS file that loads the selected assignment's details onto the page.

<---v. addasignment.html--->
The addasignment.html page is the page where users can add or edit an assignment's details. Within this file, you will find code for a form to
fill in information about an assignment. There is an external JS file that handles sending and pre-loading the assignment details.

<---vi. 404.html--->
The 404.html page is a file created by Firebase when we were hosting the website. It is an error page.

*------*
 b. CSS
*------*

<---i. styles.css--->
The styles.css external CSS file contains all the styling used in the website. The CSS in this file is separated into sections with the use of
comments.

*-------------*
 c. JavaScript
*-------------*

<---i. firebase.js--->
The firebase.js file has all the JS required to intialize firebase and it's components.

<---ii. main.js--->
The main.js file has all the JS to handle the functionality of the interactive list page. It has JS for loading assignments, marking assignments
as completed, and handling a clicked assignment.

<---iii. ultilities.js--->
The ultilites.js file has JS for fetching data from the session or local storage as well as other general functions.

<---iv. classes.js--->
The classes.js file has all the JS for creating classes for the website. It has constructors for assignments, users, and courses.

<---v. listRow.js--->
The listRow.js file has all the JS for dynamically creating the list rows with the assignment data from the database.

<---vi. details.js--->
The details.js file has all the JS for the assignment details page. It has JS that handles loading the assignment details, marking assignments as
completed or incomplete, and dynamically generating a header with the assignment name in it.

<---vii. addAssignments.js--->
The addAssignments.js file has all the JS for the add/edit assignments page. It handles pre-loading assignment details if they exist, autocomplete,
and submit confirmation.

<---viii. autocomplete.js--->
The autocomplete.js file has all the JS for the autocomplete functionality on the add/edit form. It handles creating the html for the autocomplete
and giving it autocomplete fields.
