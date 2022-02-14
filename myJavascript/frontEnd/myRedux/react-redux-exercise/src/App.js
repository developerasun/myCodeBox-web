import './App.css';
import { Provider } from 'react-redux'
import store from './redux/store';
import CakeContainer from './components/cakeContainer';
import HooksCakeContainer from './components/hooksCakeContainer';
import IceCreamContainer from './components/iceCreamContainer';
import NewCakeContainer from './components/newCakeContainer';
import ItemContainer from './components/itemContainer';
import UserContainer from './components/userContainer';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CakeContainer />
        <HooksCakeContainer />
        <IceCreamContainer />
        <NewCakeContainer />
        <ItemContainer cake />
        <ItemContainer iceCream />
        <UserContainer />
      </div>
    </Provider>
  );
}

export default App;
