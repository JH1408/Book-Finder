# Book Finder App

## Overview

With this app you can search books using the [Google Books API](https://developers.google.com/books/) and you can save your favorite books after creating a user account.
This project was created as part of the Chingu Voyage 12 pre-work phase to demonstrate skills in building a full-stack app.

See the project in action [here](https://josy-book-finder.herokuapp.com/).

## Features

- Search books using the [Google Books API](https://developers.google.com/books/)
- Infinite scroll: 10 results are shown, scrolling all the way down loads 10 more and so on
- Create a user account to save books
- Stay logged in for 5 days
- View saved books after logging in
- Remove saved books from your list

## Run the project

- Clone this project
- cd into the project directory
- Run `npm install` in your command line from the root folder and the client folder
- Create a .env file in the root of the project with the URL to your MongoDB, your port and your Google Books API credentials
- Run `npm run dev` in your command line
- Visit http://localhost:3000 in your browser

## Tech stack
- Node.js
- Express
- MongoDB
- React (incl. React Redux & Redux Saga)
- JWT for authentication
