import * as S from './ScheduleList.styles';
import { useAppSelector } from '@/hooks/useRedux';
import { toDate } from '@/utils/generateRepeatingSchedules';

export const ScheduleList = () => {
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);
	const filteredSchedules = useAppSelector((state) => state.schedule.filteredSchedules);

	return (
		<S.ScheduleListContainer>
			<h3>
				{selectedDate ? `${selectedDate.toDateString().slice(4, 10)}일의 업무` : 'Loading...'}
			</h3>
			{filteredSchedules.length > 0 ? (
				<ul>
					{filteredSchedules.map((schedule) => (
						<li key={schedule.schedule_id}>
							<strong>{schedule.category}</strong>: {schedule.description}
							<strong>{String(toDate(schedule.start_time))}</strong>:{' '}
							{String(toDate(schedule.end_time))}
						</li>
					))}
				</ul>
			) : (
				<p>오늘은 쉬는 날 😚</p>
			)}
		</S.ScheduleListContainer>
	);
};
