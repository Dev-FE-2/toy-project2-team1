import { Schedules } from '@/types/schedule';

const initialState: Schedules = {
	schedules: [],
};

function scheduleReducer(state: Schedules = initialState, action: any): Schedules {
	switch (action.type) {
		case 'GET_SCHEDULES':
			return { ...state, schedules: action.payload };
		case 'ADD_SCHEDULE':
			return { ...state, schedules: [...state.schedules, action.payload] };
		case 'EDIT_SCHEDULE':
			return {
				...state,
				schedules: state.schedules.map((s) =>
					s.schedule_id === action.payload.schedule_id ? action.payload : s,
				),
			};
		case 'REMOVE_SCHEDULE':
			return {
				...state,
				schedules: state.schedules.filter((s) => s.schedule_id !== action.payload),
			};
		default:
			return state;
	}
}

export default scheduleReducer;
