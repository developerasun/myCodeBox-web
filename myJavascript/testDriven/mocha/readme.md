# Learning Mocha essential

> Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

## Test directory

> By default, mocha looks for the glob "./test/\*.{js,cjs,mjs}", so you may want to put your tests in test/ folder. If you want to include subdirectories, pass the --recursive option. For example,

```shell
$mocha --recursive "./spec/*.js"
```

> Mocha discovers test files; when given no files or directories, it finds files with extensions .js, .mjs or .cjs in the test directory (but not its children), relative to the current working directory

> Some shells support recursive matching by using the globstar (\*\*) wildcard. Bash >= 4.3 supports this with the globstar option which must be enabled to get the same results as passing the --recursive option (ZSH and Fish support this by default). With recursive matching enabled, the following is the same as passing --recursive:

```shell
$mocha "./spec/**/*.js"
```

## Assertion

> Mocha allows you to use any assertion library you wish. In the above example, we’re using Node.js’ **built-in assert module** — but generally, if it throws an Error, it will work! This means you can use libraries such as:

## Asynchronous code

> By adding an argument (usually named done) to it() to a test callback, Mocha will know that it should wait for this function to be called to complete the test. This callback accepts both an Error instance (or subclass thereof) or a falsy value; anything else is invalid usage and throws an error (usually causing a failed test).

```js
describe("User", function () {
  describe("#save()", function () {
    it("should save without error", function (done) {
      var user = new User("Luna");
      user.save(function (err) {
        if (err) done(err);
        else done();
      });
    });
  });
});
```

> Alternatively, use the done() callback directly (which will handle an error argument, if it exists):

```js
describe("User", function () {
  describe("#save()", function () {
    it("should save without error", function (done) {
      var user = new User("Luna");
      user.save(done);
    });
  });
});
```

### Using async/await

> If your JS environment supports async / await, you can also write asynchronous tests like this:

```js
beforeEach(async function () {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe("#find()", function () {
  it("responds with matching records", async function () {
    const users = await db.find({ type: "User" });
    users.should.have.length(3);
  });
});
```

## Arrow function

> Passing arrow functions (aka “lambdas”) to Mocha is discouraged. Lambdas lexically bind this and cannot access the Mocha context. For example, the following code will fail:

```js
describe("my suite", () => {
  it("my test", () => {
    // should set the timeout of this test to 1000 ms; instead will fail
    this.timeout(1000);
    assert.ok(true);
  });
});
```

> If you do not need to use Mocha’s context, lambdas should work. Be aware that using lambdas will be more painful to refactor if the need eventually arises!

## Hooks

> With its default “BDD”-style interface, Mocha provides the hooks before(), after(), beforeEach(), and afterEach(). These should be used to set up preconditions and clean up after your tests.

```js
describe("hooks", function () {
  before(function () {
    // runs once before the first test in this block
  });

  after(function () {
    // runs once after the last test in this block
  });

  beforeEach(function () {
    // runs before each test in this block
  });

  afterEach(function () {
    // runs after each test in this block
  });

  // test cases
});
```

## Pending test

> “Pending” — as in “someone should write these test cases eventually” — test-cases are those without a callback. Pending tests will be included in the test results, and marked as pending. A pending test is not considered a failed test.

```js
describe("Array", function () {
  describe("#indexOf()", function () {
    // pending test below
    it("should return -1 when the value is not present");
  });
});
```

## Exclusive test

> The exclusivity feature allows you to run only the specified suite or test-case by appending .only() to the function. Here’s an example of executing only a particular suite:

> Exclusive tests are incompatible with parallel mode.

```js
describe("Array", function () {
  describe("#indexOf()", function () {
    it.only("should return -1 unless present", function () {
      // this test will be run
    });

    it("should return -1 if called with a non-Array context", function () {
      // this test will not be run
    });
  });
});
```

## Inclusive test

> This feature is the inverse of .only(). By appending .skip(), you may tell Mocha to ignore test case(s). Anything skipped will be marked as pending, and reported as such.

```js
describe("#indexOf()", function () {
  it.skip("should return -1 unless present", function () {
    // this test will not be run
  });

  it("should return the index when present", function () {
    // this test will be run
  });
});
```

> Best practice: Use .skip() instead of commenting tests out.

## Reference

- [Mocha offical docs](https://mochajs.org/)
