import * as S from './ScheduleManagement.styles';
import { CalendarComponent, ScheduleList } from '@/components';

export function ScheduleManagement() {
	return (
		<S.ScheduleManagementContainer>
			<CalendarComponent isManagementPage={true} />
			<ScheduleList />
		</S.ScheduleManagementContainer>
	);
}
