# Learning Chai essentials
> Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

> This section of the guide introduces you to the three different assertion styles that you may use in your testing environment. Once you have made your selection, it is recommended that you look at the API Documentation for your selected style.

## Assert style
> The assert style is exposed through assert interface. This provides the classic assert-dot notation, similar to that packaged with node.js. This assert module, however, provides several additional tests and is browser compatible.

```js
const assert = require('chai').assert
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

assert.equal(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
```

> In all cases, the assert style allows you to include an optional message as the last parameter in the assert statement. These will be included in the error messages should your assertion not pass.

## Behaviour driven development style
> The BDD style comes in two flavors: expect and should. Both use the same chainable language to construct assertions, but they differ in the way an assertion is initially constructed. In the case of should, there are also some caveats and additional tools to overcome the caveats.

### Expect
```js
const expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);
```

> Expect also allows you to include arbitrary messages to prepend to any failed assertions that might occur.

```js
const answer = 43;

// AssertionError: expected 43 to equal 42.
expect(answer).to.equal(42);

// AssertionError: topic [answer]: expected 43 to equal 42.
expect(answer, 'topic [answer]').to.equal(42);
```

### Should
> The should style allows for the same chainable assertions as the expect interface, however it extends each object with a should property to start your chain. This style has some issues when used with Internet Explorer, so be aware of browser compatibility.

### Differences
> First of all, notice that the expect require is just a reference to the expect function, whereas with the should require, the function is being executed.

```js
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
```
> The expect interface provides a function as a starting point for chaining your language assertions. It works on node.js and in all browsers.

> The should interface extends Object.prototype to provide a single getter as the starting point for your language assertions. It works on node.js and in all modern browsers except Internet Explorer.

### API reference
> The following are provided as chainable getters to improve the readability of your assertions.

1. to
1. be
1. been
1. is
1. that
1. which
1. and
1. has
1. have
1. with
1. at
1. of
1. same
1. but
1. does
1. still
1. also
1. .not

## Reference 
- [Chai](https://www.chaijs.com/)