# Learning Express Essentials

> Express is a minimal and flexible Node.js **web application framework** that provides a robust set of features for web and mobile applications.

> The **Express** philosophy is to provide small, robust tooling for HTTP servers, making it a great solution for **single page applications**, websites, hybrids, or public HTTP APIs.

> Express does not force you to use any specific ORM or template engine. With support for **over 14 template engines** via Consolidate.js, you can quickly craft your perfect framework.

Based on NPM Express docs, Express package features are,

> Robust routing
> Focus on high performance
> Super-high test coverage
> HTTP helpers (redirection, caching, etc)
> View system supporting 14+ template engines
> Content negotiation
> Executable for generating applications quickly

## Routing

> In fact, the routing methods can have more than one callback function as arguments. With multiple callback functions, it is **important to provide next as an argument** to the callback function **and then call next()** within the body of the function to hand off control to the next callback.

> There is a special routing method, **app.all()**, used to load middleware functions at a path for **all HTTP request methods**. For example, the following handler is executed for requests to the route “/secret” whether using GET, POST, PUT, DELETE, or any other HTTP request method supported in the http module.

```js
app.all("/secret", function (req, res, next) {
  console.log("Accessing the secret section ...");
  next(); // pass control to the next handler
});
```

### Chainable routing

> You can create **chainable route handlers** for a route path by using **app.route()**. Because the path is specified at a single location, creating modular routes is helpful, as is reducing redundancy and typos.

```js
app
  .route("/book")
  .get(function (req, res) {
    res.send("Get a random book");
  })
  .post(function (req, res) {
    res.send("Add a book");
  })
  .put(function (req, res) {
    res.send("Update the book");
  });
```

### Regular expression in route

> This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.

```js
app.get(/.*fly$/, function (req, res) {
  res.send("/.*fly$/");
});
```

### Response methods

> The methods on the response object (res) in the following table can send a response to the client, and **terminate the request-response cycle**. If none of these methods are called from a route handler, the client request will be left hanging.

<img src="reference/response-methods.png" width=781 height=441 alt="response methods in express" />

1. res.download() Prompt a file to be downloaded.
1. res.end() End the response process.
1. res.json() Send a JSON response.
1. res.jsonp() Send a JSON response with JSONP support.
1. res.redirect() Redirect a request.
1. res.render() Render a view template.
1. res.send() Send a response of various types.
1. res.sendFile() Send a file as an octet stream.
1. res.sendStatus() Set the response status code and send its string representation as the response body.

<details>
<summary>Caution as to req.body</summary>

> As **req.body’s shape is based on user-controlled input**, all properties and values in this object are untrusted and **should be validated before trusting**. For example, req.body.foo.toString() may fail in multiple ways, for example foo may not be there or may not be a string, and toString may not be a function and instead a string or other user-input.

</details>

## Middleware

> Middleware functions are functions that have **access to the request object (req), the response object (res), and the next function** in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

> To load the middleware function, call app.use(), specifying the middleware function.

> The **order of middleware loading is important**: middleware functions that are loaded first are also executed first. If myLogger is loaded after the route to the root path, the request never reaches it and the app doesn’t print “LOGGED”, **because the route handler of the root path terminates the request-response cycle**.

> Use the cookie-parser middleware to parse incoming cookies off the req object

### The next parameter

> **The next() function is not a part of the Node.js or Express API, but is the third argument that is passed to the middleware function**. The next() function could be named anything, but by convention it is always named “next”. To avoid confusion, always use this convention.

> If you pass anything to the next() function (except the string 'route' or 'router'), Express **regards the current request as being an error** and will skip any remaining non-error handling routing and middleware functions.

> If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

### Custom parameter

> If you need your middleware to be configurable, export a function which accepts an options object or other parameters, which, then returns the middleware implementation based on the input parameters.

```js
module.exports = function (options) {
  return function (req, res, next) {
    // Implement the middleware function based on the options object
    next();
  };
};
```

## Using middleware

> Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

> An Express application can use the following types of middleware:

1. Application-level middleware
1. Router-level middleware
1. Error-handling middleware
1. Built-in middleware
1. Third-party middleware

> You can load application-level and router-level middleware with an optional mount path. You can also load a series of middleware functions together, which creates a sub-stack of the middleware system at a mount point.

### Application-level middleware

> Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions, where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.

```js
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});
```

> Here is an example of loading a series of middleware functions at a mount point, with a mount path. It illustrates a middleware sub-stack that prints request info for any type of HTTP request to the /user/:id path.

```js
app.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);
```

> Middleware can also be declared in an array for reusability. This example shows an array with a middleware sub-stack that handles GET requests to the /user/:id path.

```js
function logOriginalUrl(req, res, next) {
  console.log("Request URL:", req.originalUrl);
  next();
}

function logMethod(req, res, next) {
  console.log("Request Type:", req.method);
  next();
}

const logStuff = [logOriginalUrl, logMethod];
app.get("/user/:id", logStuff, (req, res, next) => {
  res.send("User Info");
});
```

### Router-level middleware

> Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router(). Load router-level middleware by using the router.use() and router.METHOD() functions.

```js
const express = require("express");
const app = express();
const router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);
```

> To skip the rest of the router’s middleware functions, call next('router') to pass control back out of the router instance.

```js
// predicate the router with a check and bail out when needed
router.use((req, res, next) => {
  if (!req.headers["x-auth"]) return next("router"); // pass control back to router instance
  next(); // call next middleware
});
```

### Error-handling middleware

> **Error-handling middleware always takes four arguments**. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.

> Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature (err, req, res, next)):

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

## Error Handling

> Error Handling refers to how Express catches and processes errors that occur both synchronously and asynchronously. Express comes with a default error handler so you don’t need to write your own to get started.

### Errors in synchronous code

> Errors that occur in synchronous code inside route handlers and middleware require no extra work. If synchronous code throws an error, then Express will catch and process it. For example:

```js
app.get("/", (req, res) => {
  throw new Error("BROKEN"); // Express will catch this on its own.
});
```

### Errors in asynchronous code

> For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the next() function, where Express will catch and process them. For example:

```js
app.get("/", (req, res, next) => {
  fs.readFile("/file-does-not-exist", (err, data) => {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});
```

> Starting with Express 5, route handlers and middleware that return a Promise will call next(value) automatically when they reject or throw an error.

### Use promise for errors

> Use promises to avoid the overhead of the try...catch block or when using functions that return promises. For example:

```js
app.get("/", (req, res, next) => {
  Promise.resolve()
    .then(() => {
      throw new Error("BROKEN");
    })
    .catch(next); // Errors will be passed to Express.
});
```

> Since promises automatically catch both synchronous errors and rejected promises, you can simply provide next as the final catch handler and Express will catch errors, because the catch handler is given the error as the first argument.

### The default error handler

> Express comes with a built-in error handler that takes care of any errors that might be encountered in the app. This default error-handling middleware function is added at the end of the middleware function stack.

> If you pass an error to next() and you do not handle it in a custom error handler, it will be handled by the built-in error handler; the error will be written to the client with the stack trace. The stack trace is not included in the production environment.

> If you call next() with an error after you have started writing the response (for example, if you encounter an error while streaming the response to the client) the Express default error handler closes the connection and fails the request.

> So when you add a custom error handler, you must delegate to the default Express error handler, when the headers have already been sent to the client:

```js
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err); // call Express default error handler
  }
  res.status(500);
  res.render("error", { error: err });
}
```

> Note that the default error handler can get triggered if you call next() with an error in your code more than once, even if custom error handling middleware is in place.

> Notice that when not calling “next” in an error-handling function, you are responsible for writing (and ending) the response. Otherwise those requests will “hang” and will not be eligible for garbage collection.

```js
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" }); // end response manually
  } else {
    next(err);
  }
}
```

## CORS configuration in Express app

### Configuration Options

1. origin: Configures the Access-Control-Allow-Origin CORS header.

1. methods: Configures the Access-Control-Allow-Methods CORS header. Expects a comma-delimited string (ex: ‘GET,PUT,POST’) or an array (ex: ['GET', 'PUT', 'POST']).

1. preflightContinue: Pass the CORS preflight response to the next handler.

1. optionsSuccessStatus: Provides a status code to use for successful OPTIONS requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.

### Enabling CORS Pre-Flight

> Certain CORS requests are considered ‘complex’ and require an initial OPTIONS request (called the “pre-flight request”). An example of a ‘complex’ CORS request is one that uses an HTTP verb other than GET/HEAD/POST (such as DELETE) or that uses custom headers. To enable pre-flighting, you must add a new OPTIONS handler for the route you want to support:

## Production best practice : security

> The term “production” refers to the stage in the software lifecycle when an application or API is generally available to its end-users or consumers. In contrast, in the “development” stage, you’re still actively writing and testing code, and the application is not open to external access. The corresponding system environments are known as production and development environments, respectively.

> Development and production environments are usually set up differently and have vastly different requirements. What’s fine in development may not be acceptable in production. For example, in a development environment you may want verbose logging of errors for debugging, while the same behavior can become a security concern in a production environment. And in development, you don’t need to worry about scalability, reliability, and performance, while those concerns become critical in production.

### Use helmet

> Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately. Helmet is a collection of several smaller middleware functions that set security-related HTTP response headers. Some examples include:

1. helmet.contentSecurityPolicy which sets the Content-Security-Policy header. This helps prevent cross-site scripting attacks among many other things.
1. helmet.hsts which sets the Strict-Transport-Security header. This helps enforce secure (HTTPS) connections to the server.
1. helmet.frameguard which sets the X-Frame-Options header. This provides clickjacking protection.

> Helmet includes several other middleware functions which you can read about at its documentation website.

Install Helmet like any other module:

```shell
$npm install --save helmet
```

> Then to use it in your code :

```js
const helmet = require("helmet");
app.use(helmet());
```

### Disable X-Powered-By header

> If you don’t want to use Helmet, then at least disable the X-Powered-By header. Attackers can use this header (which is enabled by default) to detect apps running Express and then launch specifically-targeted attacks.

> So, best practice is to turn off the header with the app.disable() method:

```js
app.disable("x-powered-by");
```

### Use snyk

> Snyk offers both a command-line tool and a Github integration that checks your application against Snyk’s open source vulnerability database for any known vulnerabilities in your dependencies. Install the CLI as follows:

```shell
$npm install -g snyk
$cd your-app
```

> Use this command to test your application for vulnerabilities:

```shell
$snyk test
```

> Use this command to open a wizard that walks you through the process of applying updates or patches to fix the vulnerabilities that were found:

```shell
$snyk wizard
```

## Session

> **HTTP is stateless**; in order to associate a request to any other request, you need a way to store user data between HTTP requests. Cookies and URL parameters are both suitable ways to transport data between the client and the server. But they are both readable and on the client side. Sessions solve exactly this problem. **You assign the client an ID and it makes all further requests using that ID**. Information associated with the client is stored on the server linked to this ID.

> We will put the session and cookie-parser middleware in place. In this example, we will use the default store for storing sessions, i.e., MemoryStore. Never use this in production environments. The session middleware handles all things for us, i.e., creating the session, setting the session cookie and creating the session object in req object.

> Whenever we make a request from the same client again, we will have their session information stored with us (given that the server was not restarted). We can add more properties to the session object. In the following example, we will create a view counter for a client.

## Reference

- [Express.js](https://expressjs.com/)
- [Express.js - CORS](https://expressjs.com/en/resources/middleware/cors.html)
