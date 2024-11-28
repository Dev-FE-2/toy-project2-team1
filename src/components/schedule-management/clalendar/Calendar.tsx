import * as S from './Calendar.styles';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import {
	getSchedules,
	addScheduleToFirestore,
	selectDate,
	filteredSchedules,
} from '@/redux/actions/scheduleActions';
import generateRepeatingSchedules from '@/utils/generateRepeatingSchedules';
import { filterSchedulesByDateAndSort } from '@/utils/filterSchedulesByDate';
import { formatCalendarDay } from '@/utils/dateFormatter';
import { TSchedule } from '@/types/schedule';
import { toDate } from '@/utils/dateFormatter';
import { db } from '@/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

interface CalendarComponentProps {
	isManagementPage?: boolean;
}
export const CalendarComponent = ({ isManagementPage }: CalendarComponentProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);

	useEffect(() => {
		console.log('isManagementPage:', isManagementPage);
	}, [isManagementPage]);

	// Firestore에서 스케줄 가져오기 - 무한 렌더링 막기 위해 Firestore의 실시간 리스너 사용
	useEffect(() => {
		const schedulesRef = collection(db, 'schedules', 'user1', 'userSchedules');

		const unsubscribe = onSnapshot(schedulesRef, (snapshot) => {
			const schedules = snapshot.docs.map((doc) => doc.data() as TSchedule);
			dispatch(getSchedules(schedules));
		});

		return () => unsubscribe();
	}, [dispatch]);

	// 오늘 날짜(초기) 필터링
	useEffect(() => {
		if (schedules.length > 0 && selectedDate) {
			const todaySchedules = filterSchedulesByDateAndSort(schedules, selectedDate);
			dispatch(filteredSchedules(todaySchedules));
		}
	}, [dispatch, selectedDate, schedules]);

	// 날짜 선택시 그 날짜, 그 날짜의 스케줄 필터링해서 전역 상태에 저장
	const handleDateClick = (date: Date) => {
		dispatch(selectDate(date));

		const filteredS = filterSchedulesByDateAndSort(schedules, date);

		console.log('filteredS:', filteredS); // 디버깅용

		dispatch(filteredSchedules(filteredS));
	};

	// 임시 데이터
	const schedule: TSchedule = {
		schedule_id: uuidv4(), // 초기 스케줄 ID
		category: '매점',
		start_date_time: new Date('2024-11-22T22:00:00.000Z'),
		time: '5',
		repeat: '매일',
		repeat_end_date: new Date('2024-11-27T00:00:00.000Z'),
		description: '대청소!!',
		created_at: new Date(),
	};
	const handleAddSchedule = async () => {
		const newSchedules = generateRepeatingSchedules(schedule);
		console.log('newSchedules:', newSchedules);
		const addResult = await dispatch(addScheduleToFirestore('user1', newSchedules));
		if (!addResult.success) {
			console.error('firestore에 스케줄 추가 실패:', addResult.message);
		}
	};

	// 일정 있는 날짜에 바 표시
	const tileContent = ({ date }: { date: Date }) => {
		const daySchedules = schedules
			.filter((schedule) => toDate(schedule.start_date_time).toDateString() === date.toDateString())
			.sort(
				(a, b) =>
					toDate(a.start_date_time).getTime() - toDate(b.start_date_time).getTime() ||
					toDate(a.created_at).getTime() - toDate(b.created_at).getTime(),
			)
			.slice(0, 2);
		return daySchedules.length > 0 ? (
			<>
				{daySchedules.map((s: TSchedule) => (
					<S.ScheduleBar key={s.schedule_id} $category={s.category}>
						{s.category}
					</S.ScheduleBar>
				))}
			</>
		) : null;
	};

	return (
		<S.CalenderContainer>
			{/* <div className="calener-category">카테고리 체크</div> */}
			<S.StyledCalendar
				locale="ko-KR"
				onClickDay={handleDateClick}
				value={selectedDate}
				view="month"
				formatDay={formatCalendarDay}
				calendarType="gregory" /* 일요일부터 시작 */
				prev2Label={null} /* 년 단위 이동 없앰 */
				next2Label={null} /* 년 단위 이동 없앰 */
				tileContent={tileContent}
			/>
			<button onClick={handleAddSchedule}>일정 추가</button>
		</S.CalenderContainer>
	);
};
