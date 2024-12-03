export const calculateEndDateTime = (start_date_time: Date, time: string): Date => {
	const hours = Number(time);
	const endDateTime = new Date(start_date_time);

	endDateTime.setHours(endDateTime.getHours() + (hours || 0));

	return endDateTime;
};

export default calculateEndDateTime;
