// install npm cross-env package for a better env control
// npx cross-env NODE_ENV=development node app
// dotenv.config: Loads .env file contents into process.env.
require('dotenv').config()

const { 
    NODE_ENV, 
    PORT, 
    HOST, 
    PROD 
} = process.env

console.log(
    NODE_ENV,
    PORT, 
    HOST,
    PROD
)

