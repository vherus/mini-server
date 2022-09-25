# Mini-Server
A small site with user functions

Run `npm ci` for dependancies
Remember to cd into individual client and server files by splitting a terminal.

## Notes 
- Set up .env file based on example and elephantSQl database

### Contents in order of creation
- Seed file and prisma database on server side- test the seeds are created via elephantSQl
- Created index and server pages. Couldnt get the to run without 'utils/prisma.js' which i copied from a old file.
- Created simple register, login and wlcome pages with forms on client side.
- Started an auth.js to created the tokens and be called as a function
- Created register user on client side. tested with insomia
- Did the same with login
- Added a log in redirect to './welcome' with useNavigate
- Log in was not working because no data was being recieved as i was feeding it parameters and not an event. Which was the onsubmit. Which took the user state that had already been populated with data from the handleChange.
- Used a fetch API to get the data the server is side is sending using localhost:4000
- Used the responses to check for a token. If one was found the user could log in and see the welcome page. 
- On server side i built the delete User by id area and add the auth function, but not as middleware. 
- Created a client side AdminArea that would check the token and if an admin show the pannel. To that added a delete user by id button. I have also added a delete by email but have not implemented yet. 
- Stole a bit of code im unsure about to check if people are logged in for app.js. Seems to work. just checks if you have a token. The whole program dies without it so hard to test its full use.
- Delete user worked easily once i figured out the right way to feed in the userId to the url of the fetch. userId.userId was the answer.

### Bugs to fix
- lots of functions running 2 or 4 times in logs. 
- need to add a user route and auth route, currently delete user goes to '4000/:id' not 4000:/users/:id