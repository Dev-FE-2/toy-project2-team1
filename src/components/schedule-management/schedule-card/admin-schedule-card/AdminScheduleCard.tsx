import * as S from './AdminScheduleCard.styles';
import { TSchedule, TAdminScheduleCardProps, SCHEDULE_CATEGORY_LABELS } from '@/types/schedule';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import useScheduleManage from '@/hooks/useScheduleManage';
import { setSelectedSchedule, setfilterCategory } from '@/redux/actions/scheduleActions';
import {
	setIsScheduleEditModalOpen,
	setIsScheduleDeleteModalOpen,
} from '@/redux/actions/modalActions';
import { isSameDay, formatTime } from '@/utils/dateFormatter';
import filteredRepeatSchedules from '@/utils/filteredRepeatSchedules';

const AdminScheduleCard = ({ schedule }: TAdminScheduleCardProps) => {
	const dispatch = useAppDispatch();
	const schedules = useAppSelector((state) => state.schedule.schedules);
	const selectedDate = useAppSelector((state) => state.schedule.selectedDate);

	const { handleDeleteSchedule } = useScheduleManage(schedule.user_id ?? '', schedules);

	const handleEditSchulde = (schedule: TSchedule) => {
		dispatch(setSelectedSchedule(schedule));
		dispatch(setIsScheduleEditModalOpen(true));
		dispatch(setfilterCategory('')); // 카테고리 필터 해제
	};

	const handleDeleteIconClick = async (schedule: TSchedule) => {
		const repeatedSchedules = filteredRepeatSchedules(schedule, schedules);
		const isRecurring = repeatedSchedules.length > 1;

		if (isRecurring) {
			// 반복되는 스케줄이 있으면
			dispatch(setSelectedSchedule(schedule));
			dispatch(setIsScheduleDeleteModalOpen(true));
		} else {
			await handleDeleteSchedule(schedule, false); // 하나면 그냥 삭제
		}
		dispatch(setfilterCategory('')); // 카테고리 필터 해제
	};

	// 전 날과 이어지는 스케줄인지 체크
	const compareDate = new Date(selectedDate);
	const startDate = new Date(schedule.start_date_time);
	const isYesterdaySchedule = !isSameDay(compareDate, startDate);

	return (
		<S.ScheduleCardContainer $category={schedule.category} id={schedule.user_id}>
			<S.ScheduleCardHeader>
				{isYesterdaySchedule && <span>전 날과 이어지는 스케줄이에요</span>}
				<span>{schedule.user_name}</span>
				<span>{schedule.user_alias}</span>
				<S.ScheduleCardHeaderIcon>
					<S.EditIcon onClick={() => handleEditSchulde(schedule)} />
					<S.DeleteIcon onClick={() => handleDeleteIconClick(schedule)} />
				</S.ScheduleCardHeaderIcon>
			</S.ScheduleCardHeader>
			<div>
				<span>{SCHEDULE_CATEGORY_LABELS[schedule.category]}</span>
			</div>
			<S.ScheduleCardTime>
				<span>
					{formatTime(new Date(schedule.start_date_time))} -{' '}
					{formatTime(new Date(schedule.end_date_time))}
				</span>
			</S.ScheduleCardTime>
			<div>
				<span>{schedule.description}</span>
			</div>
		</S.ScheduleCardContainer>
	);
};

export default AdminScheduleCard;
