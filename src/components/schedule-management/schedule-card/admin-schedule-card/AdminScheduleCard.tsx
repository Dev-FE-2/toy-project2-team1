import * as S from './AdminScheduleCard.styles';
import { TSchedule, SCHEDULE_CATEGORY_LABELS } from '@/types/schedule';
import { ScheduleModal } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setSelectedSchedule } from '@/redux/actions/scheduleActions';
import { setIsScheduleEditModalOpen } from '@/redux/actions/modalActions';
import { formatTime } from '@/utils/dateFormatter';

interface AdminScheduleCardProps {
	schedulesItem: TSchedule;
}

const AdminScheduleCard = ({ schedulesItem }: AdminScheduleCardProps) => {
	const dispatch = useAppDispatch();
	const isScheduleEditModalOpen = useAppSelector((state) => state.modal.isScheduleEditModalOpen);

	const handleEditSchulde = (schedule: TSchedule) => {
		dispatch(setSelectedSchedule(schedule));
		dispatch(setIsScheduleEditModalOpen(true));
	};

	return (
		<>
			<S.ScheduleCardContainer $category={schedulesItem.category} id={schedulesItem.user_id}>
				<S.ScheduleCardHeader>
					<span>{schedulesItem.user_name}</span>
					<span>{schedulesItem.user_alias}</span>
					<S.ScheduleCardHeaderIcon>
						<S.EditIcon onClick={() => handleEditSchulde(schedulesItem)} />
						<S.DeleteIcon />
					</S.ScheduleCardHeaderIcon>
				</S.ScheduleCardHeader>
				<div>
					<span>{SCHEDULE_CATEGORY_LABELS[schedulesItem.category]}</span>
				</div>
				<S.ScheduleCardTime>
					<span>{formatTime(new Date(schedulesItem.end_date_time))}</span>
				</S.ScheduleCardTime>
				<div>
					<span>{schedulesItem.description}</span>
				</div>
			</S.ScheduleCardContainer>
			{isScheduleEditModalOpen && (
				<ScheduleModal type="scheduleAdmin" mode="edit" adminUserId={schedulesItem.user_id} />
			)}
		</>
	);
};

export default AdminScheduleCard;
