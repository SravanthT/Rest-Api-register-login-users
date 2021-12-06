# Rest-APi

Created with CodeSandbox

1. create a "/Register" post route with the user
   details - name, email,password , confirm password, isAdmin
   name - should be in String format,
   email - should be in email format ,
   isAdmin - should be boolean.
   password and confirm password should match ,
   store hashed password in db.

if all conditions are satisfied send relevant status code else give proper error message to the client.

2. create a "/login" post route take details email , password

- check if user with email exists or not
- if exists then check if password is correct
- if everything is okay then create a jwt token and
  put user details in it and send it to client.

3. create a "/users" get route to access all the users.
   conditions -
   user accessing this route must be logged in and admin.

you can use {"/" , "/login" , "/register","/users"} Routes

/register and /login has Post and get methods
in GEt method we have a form which collects input data and sends to server which is received bu POST method and processed for errors if no errors found respective details are sent in response.
