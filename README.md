# Around the U.S. Back End

This repository contains the full API of my "Around the U.S." photo-gallery project, which is a part of the Practicum by Yandex web development curriculum.   This app is written in Express, uses MongoDB and has a React front-end.
 
## Features

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
The front-end is deployed [here](https://kevin.students.nomoreparties.site/) and the api is hosted [here](https://api.kevin.students.nomoreparties.site/). The repo for the front-end is [here](https://github.com/kvnloughead/react-around-auth).  The server's public IP address is 40.121.108.223.


## Directories

`/public` — static files from the build of the React front-end app.

`/data` — JSON files to temporarily emulate database integration.

`/routes` — routing files.

All other directories are optional and may be created by the developer if necessary. 

## Running the Project

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.
