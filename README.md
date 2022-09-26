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
- Turns out you could log in with any email or password. Solved with `if (login.error) {return alert('Incorrect infomation entered')}` Which checked if there was a token returned from res.json or a error code. Must rename login to token
- Stole a bit of code im unsure about to check if people are logged in for app.js. Seems to work. just checks if you have a token. The whole program dies without it so hard to test its full use.
- Delete user worked easily once i figured out the right way to feed in the userId to the url of the fetch. userId.userId was the answer.
- fixed the user routes to include user/:id 
- added a useEffect that populates a list of all users when logged in
- added search for user by id bar clinet and server side required, have not yet linked the button to search for a profile.
- added a profile page '/profile 
- added a useEffect to app.js to find what user has logged in. to send the profile infomation to the profile page. This has not worked well. the page will render iD but then if i reload or revisit the page it all crashes. I had the same issue trying to display the user search results. i cant seem to use the returning data without crashing the system.
- stopped profile page crashing most of the time but it doesnt change the user data if you log out and in with another user
- added header component and home button
- got profile info to appear. but the site get stuck on the first user to log in
- added update profile form on client side on profile page. probably wont work until fix the problem of wrong user being found. 
- fixed cascade on delete

### Bugs to fix
- why does trying to map or list results for user profile information on profile page or in search bar. kill the page if realoaded or revisited. 
- cant have profile page inside the authenticate user route?
- lots of functions running 2 or 4 times in logs. 
- rename 'login' to 'token' on login pages

### Next stages
- Have users edit profile information
- pass user state more efficiently (use context provider?)
- breakdown in to more sensible pages and parts. start calling functions and auth middleware