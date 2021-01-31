import React,{ Component } from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import Logo from '../download.png';
class NavBar extends Component{


    render(){
        return(
            <nav style={{marginBottom: "3em"}} class="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand" to="/"><img  width="30" height="30" src={Logo} alt="logo"/></Link>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <Link className="nav-link" to="/PokemonList">Pokemon List</Link>
                </li>
                <li class="nav-item">
                <Link className="nav-link" to="/MyPokemons">MyPokemons</Link>
                </li>
                <li class="nav-item">
                <Link className="nav-link" to="/Favorites">Favorites</Link>
                </li>
                </ul>
            </div>

                </div>
            </nav>
        )
    }
}


export default NavBar