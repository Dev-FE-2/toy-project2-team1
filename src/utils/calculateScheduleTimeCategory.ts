import { TScheduleTimeCategory } from '@/types/schedule';

const calculatescheduleTimeCategory = (start_date_time: Date): TScheduleTimeCategory => {
	console.log(start_date_time);
	const hours = start_date_time.getHours();
	if (hours >= 6 && hours < 12) return 'open';
	if (hours < 18) return 'middle';
	return 'close';
};

export default calculatescheduleTimeCategory;
