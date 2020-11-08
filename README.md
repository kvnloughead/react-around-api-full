# Around the U.S.

This repository contains my implementation of "Around the U.S." a responsive, single page, photo-gallery project, which is a part of the Practicum by Yandex web development curriculum.   This backend is written in Express, using MongoDB, and the frontend is written in React.

## Features

### Front End
1. Popup modals for
   - Updating profile info (including avatar image) 
   - Adding new picture cards
   - Deleting cards (user's own cards only)
2. Liking/unliking cards 
3. User authentication

### Back End
- User routes
  - Registration and login
  - Updating user information and profile picture
- Card routes - for authorized users
  - Creation of new photo cards
  - Deletion of owned cards
  - Liking and disliking of cards
- User authentication using jwt
- Mongo models for users and cards
- Validation and error handling
  - Route validation with celebrate/Joi
  - Error logging with Winston
  - Centralized Error Handling


## Links
The front-end is deployed [here](https://kevin.students.nomoreparties.site/) and the api is hosted [here](https://api.kevin.students.nomoreparties.site/). The server's public IP address is 40.121.108.223.



## Running the Project

Run `npm run dev` in the directory of the backend and `npm start` in that of the frontend.
