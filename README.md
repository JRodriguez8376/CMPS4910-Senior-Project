# CMPS4910-Senior-Project
Git Repo for PATH-O-GEN, CMPS 4910 and CMPS 4920 Senior Project.

<br />

<br />
--------------------------------------
<br />
<br />
Setting up API:
<br />
The node server requires database information to connect to: add a .env file in the same root directory as app.js 
<br />
inside the .env files add:
<br />
  DB_HOST=
  <br />
  DB_USER=
  <br />
  DB_NAME=
  <br />
  DB_PASS=
  <br />
  DB_PORT=
  <br />
  where each of those variables represent the necessary database information 
 <br />
To run the API server, ensure npm and node.js are installed on your system, then run in the node_server directory:<br />
npm install
<br />
This will download the necessary node modules. Run the API server with:<br />
node app.js
