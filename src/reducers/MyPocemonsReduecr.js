import { UPDATE_MY_POKEMONS } from '../actions/my-pocemons-actions';

export default function myPocemonReducer(state = [], { type, payload }) {
	switch(type){
		case UPDATE_MY_POKEMONS:
			return payload.state;
		default:
			return state;
	}
}