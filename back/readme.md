# Backend

## local dev
* $ `npm install`
* $ `npm run dev`

### How to use endpoints
/createUser
- needs a JSON object in the body
- object should have fields: username, email, password, and mongodbPassword

/login
- needs a JSON object in the body
- object should have fields: username, password, and mongodbPassword