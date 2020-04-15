export const moduleReducer = (state, action) => {
	switch (action.type) {
		case 'SELECT_MODULE':
			console.log('i select module');
			return;
		default:
			return;
	}
};
