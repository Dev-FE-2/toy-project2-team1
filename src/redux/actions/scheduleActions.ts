import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { Dispatch } from 'redux';
import { Schedule } from '@/types/schedule';

const db = getFirestore();

const getSchedules = (schedules: Schedule[]) => ({
	type: 'GET_SCHEDULES',
	payload: schedules,
});

const addSchedule = (schedule: Schedule) => ({
	type: 'ADD_SCHEDULE',
	payload: schedule,
});

const editSchedule = (schedule: Schedule) => ({
	type: 'EDIT_SCHEDULE',
	payload: schedule,
});

const removeSchedule = (schedule_id: string) => ({
	type: 'REMOVE_SCHEDULE',
	payload: schedule_id,
});

// firestore에서 스케줄 가져오기
export const fetchSchedules = (userId: string) => {
	return async (dispatch: Dispatch) => {
		const scheduleDocRef = doc(db, 'schedule', userId);
		const scheduleDoc = await getDoc(scheduleDocRef);

		if (scheduleDoc.exists()) {
			const data = scheduleDoc.data();
			dispatch(getSchedules(data.schedules || []));
		} else {
			dispatch(getSchedules([]));
		}
	};
};

// firestore에 스케줄 추가
export const addScheduleToFirestore = (schedule: Schedule) => {
	return async (dispatch: Dispatch) => {
		const scheduleDocRef = doc(db, 'schedule', schedule.user_id);
		const scheduleDoc = await getDoc(scheduleDocRef);

		if (scheduleDoc.exists()) {
			const data = scheduleDoc.data();
			const schedules = data.schedules || [];

			schedules.push(schedule);
			await setDoc(scheduleDocRef, { schedules });
		} else {
			await setDoc(scheduleDocRef, { schedules: [schedule] }); // 새 데이터 작성
		}
		dispatch(addSchedule(schedule));
	};
};

// firestore에 스케줄 수정
export const editScheduleToFirestore = (schedule: Schedule) => {
	return async (dispatch: Dispatch) => {
		const scheduleDocRef = doc(db, 'schedule', schedule.user_id);
		const scheduleDoc = await getDoc(scheduleDocRef);

		if (scheduleDoc.exists()) {
			const data = scheduleDoc.data();
			const schedules = data.schedules || [];

			const updatedSchedules = schedules.map((s: Schedule) =>
				s.schedule_id === schedule.schedule_id ? schedule : s,
			);
			await setDoc(scheduleDocRef, { schedules: updatedSchedules });
			dispatch(editSchedule(schedule));
		}
	};
};

// firestore에 스케줄 삭제
export const removeScheduleToFirestore = (userId: string, schedule_id: string) => {
	return async (dispatch: Dispatch) => {
		const scheduleDocRef = doc(db, 'schedule', userId);
		const scheduleDoc = await getDoc(scheduleDocRef);

		if (scheduleDoc.exists()) {
			const data = scheduleDoc.data();
			const schedules = data.schedules || [];

			const updatedSchedules = schedules.filter((s: Schedule) => s.schedule_id !== schedule_id);
			await setDoc(scheduleDocRef, { schedules: updatedSchedules });
			dispatch(removeSchedule(schedule_id));
		}
	};
};
