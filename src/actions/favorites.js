export const UPDATE = 'UPDATE';

export function updateFavorites(data){
	return {
		type: UPDATE,
		payload: {
			state: data
		}
	}
}