# Project 2

Web Programming with Python and JavaScript

This applications enables chat function between an undefined number of signed-in users. Users need only visit the site for the first time, then put in a username to get started.

Some of the functions and styling worked on Firefox, but not Chrome. Beware while testing. 

This bones of this application consist of:
- Application.py: an application that manages the index page and the all the sockets
- In templates:
  - Index.html: contains the forms for user input into the page, and script for loading initial messages
  - Layout.html: contains the user bar and other script requirements
- In static
  - Bottom button function: for the bottom button programming
  - Create channel: what happens when create channel is clicked (including prompts, alerts and sockets)
  - Current channel: sets the current channel to that selected from navbar
  - Sing up: initial page that loads if user isn't set


There are some bugs and things I'd like to do better, but don't have time to. They are as follows:
- Bottom button: disappear initially, at least until page is filled with messages
- Cancel button: doesn't allow user to leave the page off the bat
- Read function
- User profile pic
- Put create channel button on left
