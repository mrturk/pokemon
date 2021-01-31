export const UPDATE_MY_POKEMONS = 'UPDATE_MY_POKEMONS';

export function updateMyPocemons(data){
	return {
		type: UPDATE_MY_POKEMONS,
		payload: {
			state: data
		}
	}
}