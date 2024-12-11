import * as S from './ScheduleManagement.styles';
import { ScheduleList, Loading, CalendarComponent, AdminCalendarComponent } from '@/components';
import CheckboxGroup from '@/components/checkbox/CheckboxGroup';
import useIsAdmin from '@/hooks/useIsAdmin';
import { useAppSelector } from '@/hooks/useRedux';

export function ScheduleManagement() {
	const isLoading = useAppSelector((state) => state.schedule.isLoading);
	const isAdmin = useIsAdmin();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<S.ScheduleManagementContainer>
			<CheckboxGroup />
			{isAdmin ? (
				<AdminCalendarComponent isManagementPage={true} />
			) : (
				<CalendarComponent isManagementPage={true} />
			)}
			<ScheduleList />
		</S.ScheduleManagementContainer>
	);
}
