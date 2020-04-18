export const moduleReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_MODULE':
			return [...state,{name:action.module.title}];
		case 'UPDATE_MODULE':
				return [{name:action.module.title}];
		case 'SELECT_MODULE':
			console.log('i select module');
			return;
		default:
			return;
	}
};
