import { TSchedule, TScheduleState } from '@/types/schedule';
import { filterSchedulesByDateAndSort } from '@/utils/filterSchedulesByDate';

import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
	SET_LOADING,
	SET_SELECTED_SCHEDULE,
	CLEAR_SCHEDULES,
	SET_FILTER_CATEGORY,
} from '../actionTypes';
import { AnyAction } from 'redux';

// 중복 제거 함수
function dedupeSchedules(schedules: TSchedule[]): TSchedule[] {
	return Array.from(
		new Map(schedules.map((schedule) => [schedule.schedule_id, schedule])).values(),
	);
}
// 필터링 업데이트 함수
const updateFilteredSchedules = (
	schedules: TSchedule[],
	selectedDate: Date | null,
): TSchedule[] => {
	return selectedDate ? filterSchedulesByDateAndSort(schedules, selectedDate) : schedules;
};

const initialState: TScheduleState = {
	schedules: [],
	selectedDate: new Date(),
	filteredSchedules: [],
	isLoading: false,
	selectedSchedule: null,
	filterCategoryKey: '',
};

export default function scheduleReducer(
	state: TScheduleState = initialState,
	action: AnyAction,
): TScheduleState {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, isLoading: action.payload };
		case SET_SELECTED_SCHEDULE:
			return { ...state, selectedSchedule: action.payload };
		case GET_SCHEDULES: {
			const schedules = dedupeSchedules(action.payload);
			const filteredSchedules = updateFilteredSchedules(schedules, state.selectedDate);
			return { ...state, schedules, filteredSchedules };
		}
		case CLEAR_SCHEDULES:
			return initialState;
		case ADD_SCHEDULES: {
			const schedules = dedupeSchedules([...state.schedules, ...action.payload]);
			const filteredSchedules = updateFilteredSchedules(schedules, state.selectedDate);
			return {
				...state,
				schedules,
				filteredSchedules,
			};
		}
		case EDIT_SCHEDULES: {
			const scheduleMap = new Map(
				state.schedules.map((schedule) => [schedule.schedule_id, schedule]),
			);
			action.payload.forEach((schedule: TSchedule) =>
				scheduleMap.set(schedule.schedule_id, schedule),
			);
			const schedules = Array.from(scheduleMap.values());
			const filteredSchedules = updateFilteredSchedules(schedules, state.selectedDate);
			return {
				...state,
				schedules,
				filteredSchedules,
			};
		}
		case REMOVE_SCHEDULES: {
			const { payload: scheduleIds } = action;
			const schedules = state.schedules.filter(
				(schedule) => !scheduleIds.includes(schedule.schedule_id),
			);
			const filteredSchedules = updateFilteredSchedules(schedules, state.selectedDate);
			return {
				...state,
				schedules,
				filteredSchedules,
			};
		}
		case SELECT_DATE: {
			const selectedDate = new Date(action.payload);
			const filteredSchedules = updateFilteredSchedules(state.schedules, selectedDate);
			return { ...state, selectedDate, filteredSchedules };
		}
		case FILTERED_SCHEDULES:
			return { ...state, filteredSchedules: action.payload };
		case SET_FILTER_CATEGORY:
			return { ...state, filterCategoryKey: action.payload };
		default:
			return state;
	}
}
