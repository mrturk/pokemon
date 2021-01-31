import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateFavorits } from './actions/my-pocemons-actions';
import NavBar from './components/NavBar';
import PokemonList from './pages/PokemonList';
import MyPokemons from './pages/MyPokemons';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Favorites from './pages/Favorites';
class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		console.log(this.props)
		return (
			<div className="App">
				<Router>
				<NavBar/>
					<Switch>
						<Route path="/" exact component={PokemonList} />
						<Route path="/PokemonList" exact component={PokemonList} />
						<Route path="/MyPokemons" exact component={MyPokemons} />
						<Route path="/Favorites" exact component={Favorites} />
					</Switch>
				</Router>

			</div>
			

		);
	}
}

const mapStateToProps = (state,props) => {
  return state
};


export default connect(mapStateToProps)(App);