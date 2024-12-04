import { SET_MODAL_OPEN } from '../actionTypes';

export const setIsScheduleModalOpen = (isScheduleModalOpen: boolean) => ({
	type: SET_MODAL_OPEN,
	payload: isScheduleModalOpen,
});
