import { useEffect } from 'react';
import * as S from '../Calendar.styles';
import { TSchedule } from '@/types/schedule';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import {
	selectDate,
	filterSchedules,
	getSchedulesFromSupabase,
} from '@/redux/actions/scheduleActions';
import { filterSchedulesByDateAndSort } from '@/utils/filterSchedulesByDate';
import { formatCalendarDay } from '@/utils/dateFormatter';

interface CalendarComponentProps {
	isManagementPage?: boolean;
}

export const AdminCalendarComponent = ({ isManagementPage }: CalendarComponentProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);

	// 디버깅용
	useEffect(() => {
		console.log('isManagementPage:', isManagementPage);
	}, [isManagementPage]);

	const getSchedules = async () => {
		await dispatch(getSchedulesFromSupabase());
	};

	useEffect(() => {
		getSchedules();
	}, []);

	// 날짜 선택시 그 날짜, 그 날짜의 스케줄 필터링해서 전역 상태에 저장
	const handleDateClick = (date: Date) => {
		dispatch(selectDate(date));
		const filteredS = filterSchedulesByDateAndSort(schedules, date);

		dispatch(filterSchedules(filteredS));
	};

	const tileContent = ({ date }: { date: Date }) => {
		const daySchedules = schedules
			.filter(
				(schedule) => new Date(schedule.start_date_time).toDateString() === date.toDateString(),
			)
			.sort(
				(a, b) =>
					new Date(a.start_date_time).getTime() - new Date(b.start_date_time).getTime() ||
					new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
			)
			.slice(0, 2);

		return daySchedules.length > 0 ? (
			<>
				{daySchedules.map((s: TSchedule) => (
					<S.ScheduleBar key={s.schedule_id} $category={s.category}>
						{s.user_name}
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
				value={selectedDate as Date}
				view="month"
				formatDay={formatCalendarDay}
				calendarType="gregory" /* 일요일부터 시작 */
				prev2Label={null} /* 년 단위 이동 없앰 */
				next2Label={null} /* 년 단위 이동 없앰 */
				tileContent={tileContent}
			/>
		</S.CalenderContainer>
	);
};
