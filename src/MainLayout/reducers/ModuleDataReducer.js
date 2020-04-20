export const moduleDataReducer = (state, action) => {
	switch (action.type) {
		case 'Update_data':
			return [...state];
		default:
			return state;
	}
};
