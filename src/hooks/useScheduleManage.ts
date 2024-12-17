import { useAppDispatch } from './useRedux';
import { v4 as uuidv4 } from 'uuid';
import { TSchedule } from '@/types/schedule';
import {
	addScheduleToSupabase,
	editScheduleToSupabase,
	removeScheduleFromSupabase,
} from '@/redux/actions/scheduleActions';
import generateRepeatingSchedules from '@/utils/generateRepeatingSchedules';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';
import { isSameDate, isSameDateTime } from '@/utils/dateFormatter';

export default function useScheduleManage(userId: string | null, schedules: TSchedule[]) {
	const dispatch = useAppDispatch();

	const handleAddSchedule = async (schedules: TSchedule[]) => {
		if (!userId) throw new Error('userId가 없음');
		try {
			const addResult = await dispatch(addScheduleToSupabase(userId, schedules));
			if (!addResult.success) throw new Error('스케줄 추가 실패');
		} catch (error) {
			console.error('스케줄 추가 실패:', error);
			throw error;
		}
	};

	const handleEditSchedule = async (
		prevSchedule: TSchedule,
		newSchedule: TSchedule,
		editAll: boolean,
	) => {
		if (!userId) throw new Error('userId가 없음');
		if (!prevSchedule) throw new Error('이전 스케줄 정보 없음');

		const isRepeatChanged = prevSchedule.repeat !== newSchedule.repeat;
		const isRepeatEndDateChanged =
			prevSchedule.repeat_end_date &&
			newSchedule.repeat_end_date &&
			!isSameDate(new Date(prevSchedule.repeat_end_date), new Date(newSchedule.repeat_end_date));
		const isStartDateChanged = !isSameDateTime(
			new Date(prevSchedule.start_date_time),
			new Date(newSchedule.start_date_time),
		);

		try {
			if (editAll || isRepeatChanged || isRepeatEndDateChanged || isStartDateChanged) {
				// - 전체 수정 또는 단일 수정시에도 repeat, repeat_end_date이 변경됐으면

				// 기존 반복 스케줄 계산
				const repeatSchedules = filteredRepeatSchedules(prevSchedule, schedules);

				// 기존 반복 스케줄 전체 삭제
				const scheduleIds = repeatSchedules.map((s) => s.schedule_id);

				console.log('수정 전 삭제할 스케줄:', {
					editAll,
					isRepeatChanged,
					isRepeatEndDateChanged,
					isStartDateChanged,
					scheduleIds,
				});

				// Supabase 삭제
				const deleteResult = await dispatch(removeScheduleFromSupabase(userId, scheduleIds));
				if (!deleteResult.success) throw new Error('수정 전 삭제 실패');

				// start_date_time이 바뀌지 않았으면 기존 반복 스케줄의 첫번째 요소로 반복 스케줄 생성해야함
				const baseStartDateTime = isStartDateChanged
					? newSchedule.start_date_time // 새 start_date_time 반영
					: repeatSchedules[0].start_date_time; // 기존 반복 스케줄의 첫번째 요소 사용

				// 새 반복 스케줄 생성
				const updatedSchedules = generateRepeatingSchedules({
					...newSchedule,
					start_date_time: baseStartDateTime,
					schedule_id: uuidv4(), // 첫번째 스케줄에 새로운 ID 생성해줌
				});

				// Supabase 추가
				const addResult = await dispatch(addScheduleToSupabase(userId, updatedSchedules));
				if (!addResult.success) throw new Error('전체 수정 중 추가 실패');
			} else {
				// 단일 스케줄 수정

				const editResult = await dispatch(editScheduleToSupabase([newSchedule]));
				if (!editResult.success) throw new Error('단일 스케줄 수정 실패');
			}
		} catch (error) {
			console.error('스케줄 수정 실패', error);
			throw error;
		}
	};

	const handleDeleteSchedule = async (schedule: TSchedule, deleteAll: boolean) => {
		try {
			if (!userId) throw new Error('userId가 없음');

			const repeatSchedules = filteredRepeatSchedules(schedule, schedules);

			const scheduleIds = deleteAll
				? repeatSchedules.map((s) => s.schedule_id)
				: [schedule.schedule_id];

			const deleteResult = await dispatch(removeScheduleFromSupabase(userId, scheduleIds));
			if (!deleteResult.success) throw new Error('삭제 실패');

			// 반복 스케줄 중 삭제가 일어나면 시작, 반복 종료 날짜 조정 필요
			const targetIndex = repeatSchedules.findIndex((s) => s.schedule_id === schedule.schedule_id);

			if (!deleteAll && repeatSchedules.length > 1 && targetIndex !== 0) {
				// 이전 스케줄들 종료 날짜 수정
				const prevSchedules = repeatSchedules.slice(0, targetIndex).map((prev) => {
					const prevEndDate = new Date(schedule.start_date_time);
					prevEndDate.setUTCDate(prevEndDate.getUTCDate() - 1); // 삭제 스케줄 직전 날짜 설정
					return {
						...prev,
						repeat_end_date: prevEndDate,
					};
				});

				// 이후 스케줄들 시작 날짜 수정
				const nextSchedules = repeatSchedules.slice(targetIndex + 1).map((next, i) => {
					const nextStartDate = new Date(schedule.start_date_time);
					nextStartDate.setUTCDate(nextStartDate.getUTCDate() + (i + 1)); // 순서에 따라 날짜 증가
					return {
						...next,
						start_date_time: nextStartDate,
					};
				});

				const updatedSchedules = [...prevSchedules, ...nextSchedules];

				// Supabase 수정
				await dispatch(editScheduleToSupabase(updatedSchedules));
			}
		} catch (error) {
			console.error('스케줄 삭제 실패:', error);
			throw error;
		}
	};

	return {
		handleAddSchedule,
		handleEditSchedule,
		handleDeleteSchedule,
	};
}
