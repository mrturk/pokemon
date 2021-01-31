import axios from 'axios'

export const INSERT_POKEMONS = 'INSERT_POKEMONS';

export function insertPokemons(data){
	return {
		type: INSERT_POKEMONS,
		payload: {
			state: data
		}
	}
}


