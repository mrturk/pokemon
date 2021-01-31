import { UPDATE } from '../actions/favorites';

export default function favoritesReducer(state = [], { type, payload }) {
	switch(type){
		case UPDATE:
			return payload.state;
		default:
			return state;
	}
}