import { CalendarComponent } from './user-calendar/Calendar';
import { AdminCalendarComponent } from './admin-calendar/AdminCalendar';

export const CandlearList = () => {
	const isAdmin = true;
	return <>{isAdmin ? <AdminCalendarComponent /> : <CalendarComponent />}</>;
};
