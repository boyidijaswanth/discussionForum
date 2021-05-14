#Discussion Forum
1. It is a simple Discussion forum where any user can visit the discussion topics and their metadata like. 
a) topic created by.
b) topic created on.
c) replies to that topic.

2. any user can visit the replies to each topic but only logged user can reply or edit the discussion.

3. session based authentication is used for authenticating user. 

4. for Authentication we used a middleware Passport.js.

5. Only User requesting with valid session id can create update and delete a topic or reply.

6. If an Authorized user tries to create, update or delete data user will be prompted to login again.

7. please run npm i in backend folder and run npm start to start the server.

8. please run npm i in frontend folder and run npm start to start the web application.

9. you can change the application settings in settings.json.

10. APIs used in this application are created using Rest methods and Express framework

11. all data will be stored in Mongodb using Mongoose ODM. so please install Mongodb before running this application