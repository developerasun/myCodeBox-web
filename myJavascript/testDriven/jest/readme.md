# Learning Jest Essentials

> Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

> It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!.

## Using matchers

> Jest uses "matchers" to let you test values in different ways. This document will introduce some commonly used matchers. For the full list, see the expect API doc.

## Testing Asynchronous Code

> It's common in JavaScript for code to run asynchronously. When you have code that runs asynchronously, Jest needs to know when the code it is testing has completed, before it can move on to another test. Jest has several ways to handle this.

### Callback

> The most common asynchronous pattern is callbacks. For example, let's say that you have a fetchData(callback) function that fetches some data and calls callback(data) when it is complete. You want to test that this returned data is the string 'peanut butter'.

> By default, Jest tests complete once they reach the end of their execution. That means this test will not work as intended:

```js
// Don't do this!
test("the data is peanut butter", () => {
  function callback(data) {
    expect(data).toBe("peanut butter");
  }

  fetchData(callback);
});
```

> The problem is that the test will complete as soon as fetchData completes, before ever calling the callback.

> There is an alternate form of test that fixes this. Instead of putting the test in a function with an empty argument, **use a single argument called done**. Jest will wait until the done callback is called before finishing the test.

```js
// Instead do this
test("the data is peanut butter", (done) => {
  function callback(data) {
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

> If done() is never called, the test will fail (with timeout error), which is what you want to happen.

> Note: done() should not be mixed with Promises as this tends to lead to memory leaks in your tests.

### Promises

> If your code uses promises, there is a more straightforward way to handle asynchronous tests. Return a promise from your test, and Jest will wait for that promise to resolve. If the promise is rejected, the test will automatically fail.

> For example, let's say that fetchData, instead of using a callback, returns a promise that is supposed to resolve to the string 'peanut butter'. We could test it with:

```js
test("the data is peanut butter", () => {
  return fetchData().then((data) => {
    expect(data).toBe("peanut butter");
  });
});
```

> Be sure to return the promise - if you omit this return statement, your test will complete before the promise returned from fetchData resolves and then() has a chance to execute the callback.

> If you expect a promise to be rejected, use the .catch method. Make sure to add expect.assertions to verify that a certain number of assertions are called. Otherwise, a fulfilled promise would not fail the test.

```js
test("the fetch fails with an error", () => {
  expect.assertions(1);
  return fetchData().catch((e) => expect(e).toMatch("error"));
});
```

### Async/Await

> Alternatively, you can use async and await in your tests. To write an async test, use the async keyword in front of the function passed to test. For example, the same fetchData scenario can be tested with:

```js
test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch("error");
  }
});
```

> None of these forms is particularly superior to the others, and you can mix and match them across a codebase or even in a single file. It just depends on which style you feel makes your tests simpler.

## Setup and teardown

> Often while writing tests you have some setup work that needs to happen before tests run, and you have some finishing work that needs to happen after tests run. Jest provides helper functions to handle this.

### Order of execution of describe and test blocks

> Jest executes all describe handlers in a test file before it executes any of the actual tests. This is another reason to do setup and teardown inside before* and after* handlers rather than inside the describe blocks.

> Once the describe blocks are complete, by default Jest runs all the tests serially in the order they were encountered in the collection phase, waiting for each to finish and be tidied up before moving on.

### General Advice

> If a test is failing, one of the first things to check should be whether the test is failing when it's the only test that runs. To run only one test with Jest, temporarily change that test command to a test.only:

```js
test.only("this will be the only test that runs", () => {
  expect(true).toBe(false);
});

test("this test will not run", () => {
  expect("A").toBe("A");
});
```

> If you have a test that often fails when it's run as part of a larger suite, but doesn't fail when you run it alone, it's a good bet that something from a different test is interfering with this one.

> You can often fix this by clearing some shared state with beforeEach. If you're not sure whether some shared state is being modified, you can also try a beforeEach that logs data.

## Mock function

> Mock functions allow you to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls), capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values.

> There are two ways to mock functions: Either by creating a mock function to use in test code, or writing a manual mock to override a module dependency.

```js
const mockCallback = jest.fn((x) => 42 + x);
```

### .mock property

> All mock functions have this special .mock property, which is where data about how the function has been called and what the function returned is kept. The .mock property also tracks the value of this for each call

```js
const myMock = jest.fn();

const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();

console.log(myMock.mock.instances);
// > [ <a>, <b> ]
```

> These mock members are very useful in tests to assert how these functions get called, instantiated, or what they returned:

```js
// The function was called exactly once
expect(someMockFunction.mock.calls.length).toBe(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe("first arg");
```

### Mock return value

> Mock functions can also be used to inject test values into your code during a test

> Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.

```js
const filterTestFn = jest.fn();

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter((num) => filterTestFn(num));

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls[0][0]); // 11
console.log(filterTestFn.mock.calls[1][0]); // 12
```

## Reference

- https://jestjs.io/
