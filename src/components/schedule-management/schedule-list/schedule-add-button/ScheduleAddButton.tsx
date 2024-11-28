import * as S from './ScheduleAddButton.styles';

export const ScheduleAddButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<S.ScheduleAddButton onClick={onClick} color="blue" shape="block" padding="none">
			+
		</S.ScheduleAddButton>
	);
};
