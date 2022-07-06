# Learning Redux Essentials
Took below courses and summarized essentials.

- [Code Evolution - React Redux Tutorial](https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK)
- [Free code camp - Redux](https://www.freecodecamp.org/learn/front-end-development-libraries/#redux)

## Understanding Redux
Redux is a library for Javascript applications. 

> As applications grow in size and scope, **managing shared data** becomes much more difficult. Redux is defined as a **"predictable state container for JavaScript apps"** that helps ensure your apps work predictably, and are easier to test.

> While you can use **Redux with any view library**, we introduce Redux here before combining it with React in the next set of courses.

Without Redux, a predictable state container, below two cases would happen.  

1. lifting state all the way up in component tree
<img src="reference/lifting-state-up.png" width=409 height=273 alt="lifting state up in React">

2. lifting state all the way down in component tree
<img src="reference/lifting-state-down.png" width=414 height=294 alt="lifting state down in React">

> The simplest way to pass data from a parent to a child in a React Application is by passing it on to the child's props. But an issue arises **when a deeply nested child requires data from a component higher up in the tree**. If we pass on the data through the props, every single one of the children would be required to accept the data and pass it on to its child, leading to **prop drilling**, a terrible practice in the world of React.

<details>
<summary>Comparison with Context API</summary>

<img src="reference/context-redux-comparison.png" width=750 height=690 alt="React context vs Redux">
</details>

### Principals of Redux
Below, there are three core principals of Redux. 

1. Maintain **whole application state in a single object**, managed by Redux store
2. **The state only can be changed by dispatching an action**, which is an object describing what happened. 
3. **Reducers** specify how the state should be changed.

<img src="reference/redux-js-app-relation.png" width=666 height=392 alt="redux and js application">

- JS app =====(dispatch actions)====> Reducer
- Reducer =====(update state)=====> Redux store
- Redux store =====(reflect the update)====> Js app

### Contents covered
- Creating a Redux.createStore
- Creating action/actionCreator
- Dispatching action to store
- Updating store with Reducer
- Multiple Reducers
- Handling asynchronous actions
- First Redux App

### Redux Store
is a single state object **that manages a whole application's state(state tree)**. The state must not be directly modified(immutable state, enabling time-travel debugging)

- State update in the application should only be done with **Redux store**, which is the single object **created with createStore method**.
- createStore methods takes a reducer function, which takes/returns a state.
- All state update get triggered by **dispatch method**.
- Allow access to state via **getState method**.

store.subscribe **calls a listener function** that gets triggered **every time the store is updated**. 

- Redux.createStore(*callback) => store.dispatch(state) => store updated => store.subscribe(**callback) 
- *callback : reducer(state, *action) => state case specified with switch/case statement
- *action : an object with <bold>type property</bold>
- **callback : listener function, executed every time the store is updated

To keep the state's immutability, exploit spread operator, concat, slice in array and Object.assign in object.

### Action 
An action in Redux is **a Javascript object carrying event information. Actions must have a 'type' property**, which documents what type of action has occured. Declare Redux action by creating an object with type property like below

```js
const action = { type : "LOGIN" }; 
```

<ol>

- Redux action ===(events info)===> Redux store
- Redux store updates a state
</ol>

A common practice in Redux is to **assign action types as read-only contant variables**, rather than string values. Oftentimes, action comes with data and Redux needs to handle it. 

#### Action creator
Action is delivered to Redux store by action creator. Action creator in Redux is a simply Javascript **function that returns an action(object)**. 

```js
  function actionCreator() { 
      return action;
  }
```

#### Dispatch
Action is sent to Redux.store by dispatch method like below. 

```js
Redux.store.dispatch(actionCreator()); // actionCreator returns an action(object with type property)
Redux.store.dispatch({ type:"LOGIN" }); // same result with above
```

#### Asynchronous action
**Asynchronous actions** are essential parts of web development. Redux provides a middleware called **Redux Thunk.** 

- Redux.applyMiddleware method provides a second parameter to Redux.createStore method. 

<ol>

- Requesting data with dispatch
- API calls
- Receiving data with dispatch
</ol>

### Asynchronous action with Redux
There are two types of actions - synchronous action and asynchronous one. 

1. synchronous action : once action gets dispatched, state immediately gets updated. 

2. asynchronous action : wait for a certain for state to get updated after action dispatched. In modern web application, fetching data asynchronoulsy is inevitable. 

For example, state, action, and reducer can be defined like below for asynchronously fetching data. 

```js
// define state
initialState = { 
    loading : true, // is data being fetched? 
    data : [ ], // fetched data
    errorMessage : '' // when fetching data fails for some reason
}

// define action
const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

// define reducer
const reducer = ( state = initialState, action) => {
    switch (action.type) { 
        case FETCH_DATA_REQUEST :
            return { 
                // do something
            }
            break; 
        case FETCH_DATA_SUCESS :
            return { 
                // do something
            }
            break; 
        case FETCH_DATA_FAILURE :
            return { 
                // do something
            }
            break; 
        default : return state
    }
}
```

Install below NPM packages for network requests.
```shell
$npm i axios
$npm i redux-thunk
```

### Reducer
Reducer is a function that is responsible for changing a state, corresponding delivered actions by dispatch method. 
The only job of the reducer takes state and action as arguments and **returns a new state**. The new state **must be a copy of the original state** and the reducer should not touch it in any way. 

- when appliction is relatively simple : one reducer
- when complicated : multiple reducers, combineReducer method provided by Redux.

```js
// combineReducer takes an object as paramter
const rootReducer = Redux.combineReducers({
  auth: authenticationReducer, 
  notes: notesReducer
})
```

Once rootReducer, which contains multiple Reducers, is created, it will be delivered to Redux.createStore method as a callback.

## First Redux App
```js
// goal : to create a simple counter app with Redux that increases/decreases by 1

const INCREMENT = "INCREMENT"; // Define a constant for increment action types
const DECREMENT = "DECREMENT"; // Define a constant for decrement action types

const counterReducer = function( state=0 , action ) {
    switch(action.type) {
        case INCREMENT : 
            return state+1;
        case DECREMENT : 
            return state-1;
        default : // don't forget to return default
            return state;
    }
}; // Define the counter reducer which will increment or decrement the state based on the action it receives

const incAction = () => { 
    return {
        type: INCREMENT
    }
}; // Define an action creator for incrementing

const decAction = () => {
    return { 
        type: DECREMENT
    }
}; // Define an action creator for decrementing

const store = Redux.createStore(counterReducer); // Define the Redux store here, passing in your reducers
```

## React-Redux
Redux is not directly implemented in React, rather it uses React-React library to connect with React. **React-Redux is the official Redux UI binding library** for React.

<img src="reference/react-redux-relation.png" width=726 height=169 alt="React and Redux" />

<img src="reference/react-redux-app-structure.png" width=567 height=333 alt="React Redux app structure" />

The Redux should provide its store to React app. 

### Redux middleware logger
Redux logger proivdes a useful information towards states. 

<img src="reference/redux-logger.png" width=675 height=753 alt="react state by logger middleware" />

## React and Redux typical interview question examples
### React topics 
- What do you like and dislike about React? 
- What is the signifance of having the key prop when rendering a list of elements? => React uses it for re-rendering only changed elements.
- What is a potential bug that you can introduce when using index as key? 
- Lifecycle methods(purpose of maintaining legacy codes) => mounting/unmounting, update
- Context API : prop drilling
- Hooks  
- Optimization : pure component, memo, useMemo, useCallback
- component logics : higher order component, render props pattern, custom hook
- third parties : styling, routing, form handling, state management, CRA(create react app), custom webpack config

### Redux topics
- What is Redux? => solution to prop drilling
- Comparison with Context API
- Basics : store, action, action creators, reducer, mapState(dispatch)ToProps

## React-Redux
> React Redux is the official React UI bindings layer for Redux. It lets your React components read data from a Redux store, and dispatch actions to the store to update state.

### Installation
> React Redux 7.1+ requires React 16.8.3 or later, in order to make use of React Hooks.

#### Using create-react-app
> The recommended way to start new apps with React and Redux is by using the official Redux+JS template or Redux+TS template for Create React App, which takes advantage of Redux Toolkit and React Redux's integration with React components.

```shell
# Redux + Plain JS template
$npx create-react-app my-app --template redux

# Redux + TypeScript template
$npx create-react-app my-app --template redux-typescript
```

#### An existing React app
> To use React Redux with your React app, install it as a dependency:

```shell
$npm install react-redux
```

> If you are using TypeScript, the React Redux types are maintained separately in DefinitelyTyped, but included as a dependency of the react-redux package, so they should be installed automatically. 

### API overview
1. Provider : React Redux includes a <Provider /> component, which makes the Redux store available to the rest of your app:

1. Hooks : React Redux provides a pair of custom React hooks that allow your React components to interact with the Redux store.

- useSelector reads a value from the store state and subscribes to updates 
- useDispatch returns the store's dispatch method to let you dispatch actions

### Reasons to Use React Redux
> While Redux can be used with any UI layer, it was originally designed and intended for use with React. There are UI binding layers for many other frameworks, but React Redux is maintained directly by the Redux team.

> As the official Redux binding for React, React Redux is kept up-to-date with any API changes from either library, to ensure that your React components behave as expected. Its intended usage adopts the design principles of React - writing declarative components.

> React is generally fast, but by default any updates to a component will cause React to re-render all of the components inside that part of the component tree. This does require work, and if the data for a given component hasn't changed, then re-rendering is likely some wasted effort because the requested UI output would be the same.

> If performance is a concern, the best way to improve performance is to skip unnecessary re-renders, so that components only re-render when their data has actually changed. React Redux implements many performance optimizations internally, so that your own component only re-renders when it actually needs to.

### Redux toolkit
> The Redux Toolkit package is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:

1. "Configuring a Redux store is too complicated"
1. "I have to add a lot of packages to get Redux to do anything useful"
1. "Redux requires too much boilerplate code"

```shell
$npm install @reduxjs/toolkit
$yarn add @reduxjs/toolkit
```

> Types of methods, types, properties available in Redux toolkit are as follows :

- createSlice : takes four arguments 1) slice name 2) initial state 3) reducer's' object 4) extraReducer(for async request)

- createSlice.actions : Action creators for the **types of actions that are handled by the slice reducer**.

- useSelector : A hook to **access the redux store's state**. This hook takes a selector function as an argument. The selector is called with the store state.

- PayloadAction : An **action with a string type and an associated payload**. This is the type of action returned by createAction() action creators.

- extraReducers : A property that **hooks createAsyncThunk with createSlice**. A callback that **receives a builder object** to define case reducers via calls to builder.addCase(actionCreatorOrType, reducer).

- builder.addCase : Adds **a case reducer** to handle a single exact action type.

- createEntityAdapter : A function that generates a set of **prebuilt reducers and selectors** for performing **CRUD operations** on a normalized state structure containing instances of a particular type of data object. 

- getSelectors : a function that returns **a set of selectors** that know how to read the **contents of an entity state** object:

> Note on shallow updates: **updateOne, updateMany, upsertOne, and upsertMany** only perform shallow updates in a mutable manner. This means that if your update/upsert consists of an object that includes nested properties, **the value of the incoming change will overwrite the entire existing nested object**. This may be unintended behavior for your application. As a general rule, these methods are best used with normalized data that do not have nested properties.

#### Asynchronous request with Thunk
> Dealing with asynchronous request is important in modern web application. In Redux, thunk and saga are well-known tools.

> For Redux specifically, **"thunks" are a pattern of writing functions** with logic inside that can interact with a Redux store's dispatch and getState methods. Thunks are the standard approach for **writing async logic in Redux apps**, and are commonly used for data fetching. However, they can be used for a variety of tasks, and can contain both synchronous and asynchronous logic.

> createAsyncThunk is a function that accepts a Redux **action type string and a callback function** that should return a promise. It generates promise lifecycle action types **based on the action type prefix** that you pass in, and **returns a thunk action creator** that will run the promise callback and dispatch the lifecycle actions based on the returned promise.

> This abstracts the standard recommended approach for handling async request lifecycles.

<img src="reference/asyncThunk-rejected.png" width=1000 height=520 />

> type​ is a string that will be used to generate additional Redux action type constants, representing the lifecycle of an async request. For example, a type argument of 'users/requestStatus' will generate these action types:

1. pending: 'users/requestStatus/pending'
1. fulfilled: 'users/requestStatus/fulfilled'
1. rejected: 'users/requestStatus/rejected'

### React Redux quick start
> we assume that you're using Redux Toolkit and React Redux together, as that is the standard Redux usage pattern. The examples are based on a typical Create-React-App folder structure where all the application code is in a src, but the patterns can be adapted to whatever project or folder setup you're using.

```shell
$npm install @reduxjs/toolkit react-redux
```

#### Create a Redux store
> Create a file named src/app/store.js. Import the configureStore API from Redux Toolkit. We'll start by creating an empty Redux store, and exporting it:

```js 
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {},
})
```

#### Provide the Redux Store to React​
> Once the store is created, we can make it available to our React components by putting a React Redux <Provider> around our application in src/index.js. Import the Redux store we just created, put a <Provider> around your <App>, and pass the store as a prop:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

#### Create a Redux State Slice​
> Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.

> Redux requires that we write all state updates immutably, by making copies of data and updating the copies. However, Redux Toolkit's createSlice and createReducer APIs use Immer inside to allow us to write "mutating" update logic that becomes correct immutable updates.

```js
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

#### Add Slice Reducers to the Store​
> Next, we need to import the reducer function from the counter slice and add it to our store. By defining a field inside the reducers parameter, we tell the store to use this slice reducer function to handle all updates to that state.

```js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

#### Use Redux State and Actions in React Components​
> Now we can use the React Redux hooks to let React components interact with the Redux store. We can read data from the store with useSelector, and dispatch actions using useDispatch. Create a src/features/counter/Counter.js file with a <Counter> component inside, then import that component into App.js and render it inside of <App>.

```js 
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

```

## Reference
- [Redux vs Context API: When to use them](https://dev.to/ruppysuppy/redux-vs-context-api-when-to-use-them-4k3p)
- [Free code camp - Redux](https://www.freecodecamp.org/learn/front-end-development-libraries/#redux)
- [Redux Toolkit](https://redux-toolkit.js.org/)
