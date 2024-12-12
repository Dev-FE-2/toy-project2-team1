import useSupabaseData from '../EditModal/hook/useSupabaseData';
import DetailModal from './detailModal';
import * as S from '@/components/home/MainLayout.styles';
import { useAppSelector } from '@/hooks/useRedux';

export default function MainDetailModal() {
	const month = useAppSelector((state) => state.schedule.month);
	console.log('전역 month', month);

	const { rowItems: rowItems } = useSupabaseData();
	const b = rowItems.filter((cur) => Number(cur.급여월.slice(5, 7)) === month);

	return (
		<>
			<S.PayrollTitle>급여 명세서</S.PayrollTitle>

			{b.length > 0 ? <DetailModal data={b[0]} /> : <div>데이터를 불러오는 중입니다...</div>}
		</>
	);
}
