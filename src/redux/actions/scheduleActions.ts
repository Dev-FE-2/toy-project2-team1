import { doc, setDoc, updateDoc, deleteDoc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { AppThunk } from '@/redux/store';
import { scheduleApiResponse, TSchedule } from '@/types/schedule';
import {
	GET_SCHEDULES,
	ADD_SCHEDULES,
	EDIT_SCHEDULES,
	REMOVE_SCHEDULES,
	SELECT_DATE,
	FILTERED_SCHEDULES,
	SET_LOADING,
	ADMIN_GET_SCHEDULES,
} from '../actionTypes';

const setisLoading = (isLoading: boolean) => ({
	type: SET_LOADING,
	payload: isLoading,
});

export const getSchedules = (schedules: TSchedule[]) => ({
	type: GET_SCHEDULES,
	payload: schedules,
});

export const getAdminSchedules = (schedules: TSchedule[]) => ({
	type: ADMIN_GET_SCHEDULES,
	payload: schedules,
});

const addSchedules = (schedules: TSchedule[]) => ({
	type: ADD_SCHEDULES,
	payload: schedules,
});

const editSchedules = (schedules: TSchedule[]) => ({
	type: EDIT_SCHEDULES,
	payload: schedules,
});

const removeSchedules = (scheduleIds: string[]) => ({
	type: REMOVE_SCHEDULES,
	payload: scheduleIds,
});

export const selectDate = (date: Date | null) => ({
	type: SELECT_DATE,
	payload: date,
});

export const filteredSchedules = (schedules: TSchedule[]) => ({
	type: FILTERED_SCHEDULES,
	payload: schedules,
});

/**
 * schedules (컬렉션)
 * └─ userId (문서)
 *          ├─ schedule_id_1 (문서)
 *          ├─ schedule_id_2 (문서)
 */
// firestore에 스케줄 추가
export const addScheduleToFirestore = (
	userId: string,
	schedules: TSchedule[],
): AppThunk<Promise<scheduleApiResponse<void>>> => {
	return async (dispatch) => {
		dispatch(setisLoading(true)); // 로딩 시작
		try {
			// schedules 데이터를 객체로 래핑
			const userSchedulesData = {
				schedules: schedules.map((schedule) => ({
					...schedule,
					created_at: Timestamp.now(), // 현재 시간을 추가
				})),
			};

			// Firestore에 데이터를 저장
			const userDocRef = doc(db, 'schedules', userId);
			await setDoc(userDocRef, userSchedulesData);

			// Redux 상태 업데이트
			dispatch(addSchedules(schedules));

			console.log('JSON 데이터 저장 성공');
			return {
				success: true,
				message: '일정을 성공적으로 추가했습니다.',
			};
		} catch (error) {
			console.error('JSON 데이터 저장 실패:', error);
			return {
				success: false,
				message: 'JSON 데이터 저장 중 오류가 발생했습니다.',
			};
		} finally {
			dispatch(setisLoading(false)); // 로딩 종료
		}
	};
};

// firestore에 스케줄 수정
export const editScheduleToFirestore = (
	userId: string,
	schedules: TSchedule[],
): AppThunk<Promise<scheduleApiResponse<void>>> => {
	return async (dispatch) => {
		dispatch(setisLoading(true)); // 로딩 시작
		try {
			const editPromises = schedules.map(async (schedule) => {
				// userSchedules 컬렉션의 문서 참조
				const scheduleDocRef = doc(db, 'schedules', userId, 'userSchedules', schedule.schedule_id);
				const scheduleSnapshot = await getDoc(scheduleDocRef);

				if (scheduleSnapshot.exists()) {
					// Firestore에서 문서가 존재하면 수정
					return updateDoc(scheduleDocRef, { ...schedule });
				} else {
					console.log(`${schedule.schedule_id} 가 존재하지 않음`);
					return Promise.resolve(); // 존재하지 않는 경우에도 Promise를 반환
				}
			});

			// 모든 수정 작업이 완료될 때까지 기다림
			await Promise.all(editPromises);

			// Redux 상태 업데이트
			dispatch(editSchedules(schedules));
			return {
				success: true,
				message: '일정을 성공적으로 수정했습니다.',
			};
		} catch (error) {
			console.error('firestore에 스케줄 수정 실패', error);
			return {
				success: false,
				message: '일정 수정 중 오류가 발생했습니다.',
			};
		} finally {
			dispatch(setisLoading(false)); // 로딩 종료
		}
	};
};

// firestore에 스케줄 삭제
export const removeScheduleToFirestore = (
	userId: string,
	scheduleIds: string[],
): AppThunk<Promise<scheduleApiResponse<void>>> => {
	return async (dispatch) => {
		dispatch(setisLoading(true)); // 로딩 시작
		try {
			const deletePromises = scheduleIds.map(async (scheduleId) => {
				// userSchedules 컬렉션의 문서 참조
				const scheduleDocRef = doc(db, 'schedules', userId, 'userSchedules', scheduleId);
				const scheduleSnapshot = await getDoc(scheduleDocRef);

				if (scheduleSnapshot.exists()) {
					// Firestore에서 문서가 존재하면 삭제
					return deleteDoc(scheduleDocRef);
				} else {
					console.log(`${scheduleId} 가 존재하지 않음`);
					return Promise.resolve(); // 존재하지 않는 경우에도 Promise를 반환
				}
			});

			// 모든 삭제 작업이 완료될 때까지 기다림
			await Promise.all(deletePromises);

			// Redux 상태 업데이트
			dispatch(removeSchedules(scheduleIds));

			return {
				success: true,
				message: '일정을 성공적으로 삭제했습니다.',
			};
		} catch (error) {
			console.error('firestore에 스케줄 삭제 실패', error);
			return {
				success: false,
				message: '일정 삭제 중 오류가 발생했습니다.',
			};
		} finally {
			dispatch(setisLoading(false)); // 로딩 종료
		}
	};
};
