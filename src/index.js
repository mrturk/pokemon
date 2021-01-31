import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import registerServiceWorker from 'react-service-worker';
import {combineReducers,createStore} from 'redux';
import { Provider } from 'react-redux';
import myPokemonsReducer from "./reducers/MyPocemonsReduecr"
import pokemonsReducer from './reducers/PokemonsReducer';
import favoritesReducer from './reducers/Favorites'

const rootReducer = combineReducers({
  mypokemons: myPokemonsReducer,
  pokemons:pokemonsReducer,
  favorites:favoritesReducer
});

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
registerServiceWorker()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
