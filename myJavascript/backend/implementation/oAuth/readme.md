# Learning Oauth essentials
## Understanding open authorization
Oauth is to exploit third party services for user login. From user side, the third parties are trusted one such as Facebook and Google so less security issues. From developer side, implementing login can be complex but delegate all the burdens to the thrid parties. 

<img src="reference/oauth-process.png" width=760 height=426 alt="oauth process" />

<img src="reference/oauth-process-details.png" width=704 height=433 alt="oauth process details" />

## Using OAuth 2.0 to Access Google APIs 
> Google APIs use the OAuth 2.0 protocol for authentication and authorization. Google supports common OAuth 2.0 scenarios such as those for web server, client-side, installed, and limited-input device applications.

> To begin, obtain OAuth 2.0 client credentials from the Google API Console. Then your client application requests an access token from the Google Authorization Server, extracts a token from the response, and sends the token to the Google API that you want to access. For an interactive demonstration of using OAuth 2.0 with Google (including the option to use your own client credentials), experiment with the OAuth 2.0 Playground.

### Basic 5 steps for Google Oauth
- workflow : user ===(google oauth login)===> my application ===(request for access token) ===> Google Authorization Server ===(check user consent and sends the access token) ===> my application ===(sends the token to Google API in HTTP auth request header) ===> Google API ===(sends user info)===> my application

<img src="reference/app-google-oauth-workflow.png" width=364 height=377 alt="oauth communication - application to google" />

> The authorization sequence begins when your application redirects a browser to a Google URL;

1. Obtain OAuth 2.0 credentials from the Google API Console. 
- client ID
- client secret

1. Obtain an access token from the Google Authorization Server.
- set scope to control information coverage the token can reveal
- get user consent for permission => if user agrees, Google Authorization Server sends your application access token.

1. Examine scopes of access granted by the user.
> The scope included in your request may not match the scope included in your response, even if the user granted all requested scopes.

1. Send the access token to an API.
> Access tokens are valid only for the set of operations and resources described in the scope of the token request. For example, if an access token is issued for the Google Calendar API, it does not grant access to the Google Contacts API.

1. Refresh the access token, if necessary.
> Access tokens have limited lifetimes. If your application needs access to a Google API beyond the lifetime of a single access token, it can obtain a refresh token. A refresh token allows your application to obtain new access tokens

## Passport.js
Let's take a look what passport js is. Below is from Passport JS offical homepage. 

> Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

So, basically Passport is a middleware for login. 

## Serialization and Deserialization

<img src="reference/serialization.png" width=744 height=517 alt="oauth process details" />

### Strategy : passport-google-oauth20
Install the strategy. 

```shell
$ npm install passport-google-oauth20
```

Read below offical usage from Passport.js

1. Create an Application
> Before using passport-google-oauth20, you must register an application with Google. If you have not already done so, a new project can be created in the Google Developers Console. Your application will be issued a client ID and client secret, which need to be provided to the strategy. You will also need to configure a redirect URI which matches the route in your application

1. Configure Strategy
> The Google authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. **The client ID and secret** obtained when creating an application are supplied as options when creating the strategy. The strategy also requires a verify callback, which receives the access token and optional refresh token, as well as profile which contains the authenticated user's Google profile. The **verify callback must call cb** providing a user to complete authentication.

```js
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```


### Strategy : Passport-GitHub2
Install the strategy
```shell
$ npm install passport-github2
```

Read below offical usage from Passport.js

> The GitHub authentication strategy authenticates users using a GitHub account and OAuth 2.0 tokens. The strategy requires a verify callback, which accepts these credentials and calls done providing a user, as well as options specifying a client ID, client secret, and callback URL.

```js
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
```

> Use passport.authenticate(), specifying the 'github' strategy, to authenticate requests. For example, as route middleware in an Express application:

```js 
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```


## Reference
- [NetNinja Oauth login tutorial](https://www.youtube.com/watch?v=sakQbeRjgwg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x&index=1)
- [Understanding and Implementing OAuth2 In Node.js](https://www.honeybadger.io/blog/oauth-nodejs-javascript/)
- [Alternative to Passport](https://stackshare.io/passport/alternatives)
- [Using OAuth 2.0 to Access Google APIs - Google identity](https://developers.google.com/identity/protocols/oauth2)