# SOS Frontend

Welcome to **Sos Req System**!

This website is designed to provide a rescue information.SOS Req system uses React for the front-end and NodeJS for the back-end and FastAPI for chatbot.

## Features:
- Login, signup
- Show list emergency request
- Create emergency request
- Create normal request
- Show the user's location, rescuer's location and danger area on map
- Show the request's status (pending, accepted, rescuing)
- Show the request details include: comments, votes, location
- Show realtime direction between the user and rescuer
- Show the dashboard for rescuer
- Show the dashboard for admin
- Show the users management for admin
- Show the statistic for rescuer
- Show list danger area by rescuer
- Chat with other person
- Chat with chatbot
## Requirements:
- Docker

Or 

- Nodejs: v16.x
- Google map api key
- A modern web browser such as Google Chrome, Firefox, or Safari.
- A stable internet connection.
  
## How to use the website:
- Login into the system the valid account
  
## Installation step by step
1. Install Docker and docker-compose `https://docs.docker.com/engine/install/`
2. Install nodejs
- Install crul: `sudo apt install curl`
- Install nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
- Load the source: `source ~/.bashrc`
- Install nodejs version 16.x: `nvm install v16`
3. Clone the repository: `git clone https://github.com/Tanh101/sos_system_frontend.git`
4. Copy .env.exmaple to .env and add the environment
5. Install dependences
`npm install`
6. Build the production
`npm run build`
7. Start the development server: 
`docker run -d p 8001:8000 -t frontend .`

OR using with npm
`npm run dev`

## Support:
If you have any questions or run into any issues while using the website, please create new issue and describe it. We're always happy to help!

Thank you for choosing **SOS Req**. We hope you enjoy learning and growing as a developer with us!

# Clone source code
- git clone https://github.com/Tanh101/sos_system_frontend.git
