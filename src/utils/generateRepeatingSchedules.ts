import { v4 as uuidv4 } from 'uuid';
import { TSchedule } from '@/types/schedule';
import calculateEndDateTime from './calculateEndDateTime';
import { convertUTCToKST, toDate } from './dateFormatter';

// 반복 주기에 따라 스케줄을 생성하는 함수
function generateRepeatingSchedules(schedule: TSchedule): TSchedule[] {
	const schedules: TSchedule[] = [];
	const { repeat, repeat_end_date, start_date_time, time } = schedule;

	let currDate = convertUTCToKST(toDate(start_date_time)); // 시작 날짜 및 시간

	if (!repeat || !repeat_end_date) {
		return [
			{
				...schedule,
				end_date_time: calculateEndDateTime(new Date(currDate), time),
			},
		];
	}

	const endDate = convertUTCToKST(toDate(repeat_end_date)); // 반복 종료 날짜

	while (currDate <= endDate) {
		schedules.push({
			...schedule,
			schedule_id: uuidv4(), // 각 스케줄마다 고유 ID 생성
			start_date_time: new Date(currDate),
			end_date_time: calculateEndDateTime(new Date(currDate), time),
		});

		switch (repeat) {
			case '매일':
				currDate = new Date(currDate.setDate(currDate.getDate() + 1));
				break;
			case '매주':
				currDate = new Date(currDate.setDate(currDate.getDate() + 7));
				break;
			case '매월':
				currDate = new Date(currDate.setMonth(currDate.getMonth() + 1));
				break;
		}
	}

	return schedules;
}

export default generateRepeatingSchedules;
