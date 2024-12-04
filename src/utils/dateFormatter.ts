//일단 유지 - supabase로 마이그레이션 완료 후 삭제
import { Timestamp } from 'firebase/firestore';
export function toDate(input: Timestamp | Date): Date {
	return input instanceof Timestamp ? input.toDate() : input;
}

/**
 *  DB에는 UTC로 저장
 * 화면에는 KST로 표시
 * 날짜 비교도 KST 기준으로 수행
 */
// UTC -> KST 변환 (날짜)
export const formatDate = (utcDate: Date) => {
	return new Intl.DateTimeFormat('ko-KR', {
		timeZone: 'Asia/Seoul',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	}).format(utcDate);
};

// UTC -> KST 변환 (시간)
export const formatTime = (utcDate: Date) => {
	return new Intl.DateTimeFormat('ko-KR', {
		timeZone: 'Asia/Seoul',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}).format(utcDate);
};

// 한국어 날짜 포맷으로 변환
export const formatToKoreanDate = (date: Date) => {
	return new Intl.DateTimeFormat('ko-KR', {
		month: 'long',
		day: 'numeric',
		timeZone: 'Asia/Seoul',
	}).format(date);
};

// 날짜 포맷 변경(숫자만) - 캘린더에 일만 표시하기 위해
export const formatCalendarDay = (_locale: string | undefined, utcDate: Date) => {
	const day = utcDate.getDate();
	return day < 10 ? `0${day}` : `${day}`;
};

// KST 기준으로 시간 비교
export const isSameTime = (d1: Date, d2: Date): boolean => {
	return formatTime(d1) === formatTime(d2);
};

// KST 기준으로 날짜 비교
export const isSameDay = (d1: Date, d2: Date): boolean => {
	return formatDate(d1) === formatDate(d2);
};
