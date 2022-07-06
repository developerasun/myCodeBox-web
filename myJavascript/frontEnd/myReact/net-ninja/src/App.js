import React from "react";
import { useState } from "react";
import Navbar from './components/contextHooks/navbar'
import BookList from './components/contextHooks/bookList'
import ThemeContextProvider from './components/contextHooks/context/themeContext'
import AuthContextProvider from './components/contextHooks/context/authContext'
import ToggleTheme from './components/contextHooks/toggle'
import SongList from './components/contextHooks/songlist'
import UseContextBookList from './components/contextHooks/useContextBookList'
import MultipleUseContextBookList from './components/contextHooks/multipleUseContextBookList'
import UseContextToggle from './components/contextHooks/useConetxtToggle'
import ListDataContextProvider from './components/contextHooks/context/listDataContext'
import DummyList from './components/contextHooks/dummyList'
import ReducerContextProvider from "./components/contextHooks/context/reducerContext";
import ReducerBookList from './components/contextHooks/reducerBookList'
import ReducerBookForm from './components/contextHooks/reducerBookForm'
import TestingHeader from "./components/testingLibrary/testingHeader";
import TestingTodoFooter from './components/testingLibrary/testingTodoFooter'
function App() {
  
  return (
      <div className="App" >

        {/***************** React Context API and Hooks ****************/}

        <ThemeContextProvider>
        <AuthContextProvider>
            <Navbar />
            {/* BookList component consumes two states, each of which comes from
            ThemeContextProvider and AuthContextProvider.
            */}
            <BookList />
            <ToggleTheme />  
            <UseContextBookList />
            <MultipleUseContextBookList />
            <UseContextToggle />
        </AuthContextProvider>
        </ThemeContextProvider>

        <SongList />

        <ListDataContextProvider>
            <DummyList />
        </ListDataContextProvider>


        <ReducerContextProvider>
          <ReducerBookList />
          <ReducerBookForm />
        </ReducerContextProvider>

        <TestingHeader title={"hello react testing library"} />
        <TestingTodoFooter incompleTasks={5}/>
        {/***************** React Query ****************/}
        {/* // import Navbar from "./components/query/navbar";
        // import nameContainer from "./components/query/stateNames/nameContainer";
        // import RenderPlanet from "./components/query/planets";
        // import RenderPeople from "./components/query/people"; */}
        {/* const [page, setPage] = useState(nameContainer.setPageConst.planet) */}
        {/* <Navbar setPage={setPage}/>
        <main>
          <h1 style={{"textAlign":"center"}}>React Query Exercise</h1>
          { page===nameContainer.setPageConst.planet 
                ? <RenderPlanet/> : <RenderPeople /> }
        </main> */}
      </div>
  );
}

export default App;
