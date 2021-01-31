import { INSERT_POKEMONS } from '../actions/pokemons-action';

export default function pokemonsReducer(state = [], { type, payload }) {
	switch(type){
		case INSERT_POKEMONS:
			return payload.state;
		default:
			return state;
	}
}

