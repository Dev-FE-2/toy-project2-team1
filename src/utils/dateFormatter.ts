// KST 기준으로 포맷된 문자열로 변환
export const formatToKoreanTime = (date: Date) => {
	const koreaTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
	const year = koreaTime.getFullYear();
	const month = String(koreaTime.getMonth() + 1).padStart(2, '0');
	const day = String(koreaTime.getDate()).padStart(2, '0');
	const hour = String(koreaTime.getHours()).padStart(2, '0');
	const minute = String(koreaTime.getMinutes()).padStart(2, '0');
	return `${year}-${month}-${day} ${hour}:${minute}`;
};

// 한국어 날짜 포맷으로 변환
export const formatToKoreanDate = (date: Date) => {
	return new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric' }).format(date);
};

// UTC → KST
export function convertUTCToKST(date: Date): Date {
	const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환해
	return new Date(date.getTime() - kstOffset);
}

// Timestamp(Firestore의), string(redux persist) → Date
export function toDate(input: string | Date | { seconds: number; nanoseconds: number }): Date {
	if (input instanceof Date) return input;
	if (typeof input === 'string') return new Date(input);
	if (input && typeof input.seconds === 'number' && typeof input.nanoseconds === 'number') {
		return new Date(input.seconds * 1000 + Math.floor(input.nanoseconds / 1e6));
	}
	throw new Error('Invalid datetime input입니다');
}

// 날짜 포맷 변경(숫자만) - 캘린더에 일만 표시하기 위해
export const formatCalendarDay = (locale: string | undefined, date: Date): string => {
	const day = date.getDate();
	return day < 10 ? `0${day}` : `${day}`;
};
