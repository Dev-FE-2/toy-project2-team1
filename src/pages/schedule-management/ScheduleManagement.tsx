import * as S from './ScheduleManagement.styles';
import { ScheduleList, Loading, CalendarComponent } from '@/components';
import CheckboxGroup from '@/components/checkbox/CheckboxGroup';
import { useAppSelector } from '@/hooks/useRedux';

export function ScheduleManagement() {
	const isLoading = useAppSelector((state) => state.schedule.isLoading);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<S.ScheduleManagementContainer>
			<CheckboxGroup />
			<CalendarComponent isManagementPage={true} />
			<ScheduleList />
		</S.ScheduleManagementContainer>
	);
}
