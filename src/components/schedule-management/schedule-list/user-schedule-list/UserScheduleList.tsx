import * as S from './UserScheduleList.styles';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toDate, formatToKoreanDate } from '@/utils/dateFormatter';
import { ScheduleAddButton } from '../schedule-add-button/ScheduleAddButton';
// import ModalPortal from '../../../modal/ModalPortal';
// import ScheduleModal from '../../../modal/ScheduleModal';
import { removeScheduleToFirestore } from '@/redux/actions/scheduleActions';
import { TSchedule } from '@/types/schedule';
export const UserScheduleList = () => {
	const dispatch = useAppDispatch();
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const filteredSchedules = useAppSelector((state) => state.schedule.filteredSchedules);

	const handleScheduleAddButtonClick = () => {
		alert('스케줄 추가 버튼 클릭');
	};

	const handleScheduleClick = (schedule: TSchedule) => {
		alert(`${schedule.schedule_id} 스케줄 삭제 버튼 클릭`);
		dispatch(removeScheduleToFirestore('user1', [schedule.schedule_id]));
	};

	return (
		<S.ScheduleListContainer>
			<h3>
				{selectedDate ? (
					<>
						<S.DateText>{formatToKoreanDate(selectedDate)}</S.DateText> 의 업무
					</>
				) : (
					'Loading...'
				)}
			</h3>
			{filteredSchedules.length > 0 ? (
				<ul>
					{filteredSchedules.map((schedule) => (
						<li
							key={schedule.schedule_id}
							onClick={() => {
								handleScheduleClick(schedule);
							}}
						>
							<strong>{schedule.category}</strong>: {schedule.description}
							<strong className="time">{String(toDate(schedule.start_date_time))}</strong>:{' '}
							{schedule.end_date_time ? String(toDate(schedule.end_date_time)) : ''}
						</li>
					))}
				</ul>
			) : (
				<p>오늘은 쉬는 날 😚</p>
			)}
			<ScheduleAddButton
				onClick={() => {
					handleScheduleAddButtonClick();
				}}
			/>
		</S.ScheduleListContainer>
	);
};
