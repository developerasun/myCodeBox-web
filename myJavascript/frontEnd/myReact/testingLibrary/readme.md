# Learning React testing library essentials

Took below course and summarzied essentials. 

- [Net ninja - react testing library](https://www.youtube.com/watch?v=tit8PecSH70&list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ&index=2)

The reason of test is needed as follows : 
1. easy to catch bugs 
2. increase trusts in application
3. speeds up QA time
4. serve as documentation

> Projects created with Create React App have out of the box support for React Testing Library. If that is not the case, you can add it via npm (npm install --save-dev @testing-library/react)

Types of common tests are as follows.

1. unit test : alone component should work fine => React testing library
2. integration test : componenets related should work together fine => React testing library
3. end to end test(e2e) : testing every single feature from user persepctive. => usually done with tools like cypress.

Note that files in the form of (filename).test.js will be considered as test files by React testing library.

## Adding jest configuration
Create a jsconfig.json file in project root with below codes so that text editor will recognize Jest for autocomplete.

```json
{
    "typeAcquisition": {
        "include": ["jest"]
    }
}
```

## Understanding test block
Test code block consist of like below. 

1. Render a component that you want to test
2. Find elements that you want to interact with 
3. The component and element interact
4. Assert if result comes out as expected

```js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// test and it is interchangable.
it('renders learn react link', () => {
    render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

```

<img src="reference/test-name.png" width=360 height=220 />

## Understanding screen methods
Most of time, you will utilize get methods over than find/query ones.  

- getBy : sync, 1 match
- findBy : async, 1 match
- queryBy : sync, 1 match 

- getAllBy : sync, 1+ matches
- findAllBy : async, 1+ matches
- queryAllBy : sync, 1+ matches

The point in choosing test methods is to mimic user interaction as much as possible. Method priority is as follows. 

<img src="reference/testing-priority.png" width=640 height=700 />

Typical directory convention for testing files as follows. 

<img src="reference/test-dir-convention.png" width=510 height=411 />

## Test code examples
When writing tests, try to isolate each test so that responsibility of each test can be clear. And testing is done in isolated environment. For example, when react-router or other tools is used in development, a similar requirement should be done(mocking) in testing environment as well. 

```js
import { BrowserRouter } from 'react-router-dom'
const MockRouterComponent = () => {
    return (<BrowserRouter>
                <ComponentHere>
            </BroswerRouter>)
}
```

## Better way to manage test blocks
Use describe block to group the same type of test blocks.

<img src="reference/describe-block.png" width=400 height=510 />

### Mocking request
In real production-level application, testing your component with external API is not a great idea because, 

- testing dependent on external sources
- requests actually cost money in real world

thus, mocking request with jest and create a dummy data is a better option.

### Before, After hooks
Sometimes, some tests should be run before/after than other test. Use below methods in your demands. 

- beforeEach
- beforeAll
- afterEach
- afterAll

<img src="reference/before-after-hooks.png" width=581 height=519 />
