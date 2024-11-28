import { TSchedule, TScheduleState } from '@/types/schedule';
import { filterSchedulesByDate } from '@/utils/filterSchedulesByDate';

import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
	SET_LOADING,
} from '../actionTypes';

const initialState: TScheduleState = {
	schedules: [],
	selectedDate: new Date(),
	filteredSchedules: [],
	isLoading: false,
};

function scheduleReducer(state: TScheduleState = initialState, action: any): TScheduleState {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, isLoading: action.payload };
		case GET_SCHEDULES:
			return { ...state, schedules: action.payload, isLoading: false };
		case ADD_SCHEDULES:
			return { ...state, schedules: [...state.schedules, ...action.payload], isLoading: false };
		case EDIT_SCHEDULES: {
			const updatedSchedules = state.schedules.map((s) => {
				const updated = action.payload.find(
					(edit: TSchedule) => edit.schedule_id === s.schedule_id,
				);
				return updated ? updated : s;
			});
			return {
				...state,
				schedules: updatedSchedules,
				filteredSchedules: state.selectedDate
					? filterSchedulesByDate(updatedSchedules, state.selectedDate)
					: updatedSchedules,
				isLoading: false,
			};
		}
		case REMOVE_SCHEDULES: {
			const { payload: scheduleIds } = action;
			return {
				...state,
				schedules: state.schedules.filter(
					(schedule) => !scheduleIds.includes(schedule.schedule_id),
				),
				filteredSchedules: state.filteredSchedules.filter(
					(schedule) => !scheduleIds.includes(schedule.schedule_id),
				),
				isLoading: false,
			};
		}
		case SELECT_DATE:
			return { ...state, selectedDate: action.payload, isLoading: false };
		case FILTERED_SCHEDULES:
			return { ...state, filteredSchedules: action.payload, isLoading: false };
		default:
			return state;
	}
}

export default scheduleReducer;
