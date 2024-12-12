import useSupabaseData from '../EditModal/hook/useSupabaseData';
import DetailModal from './detailModal';
import * as S from '@/components/home/MainLayout.styles';

export default function MainDetailModal() {
	const { rowItems: rowItems } = useSupabaseData();
	const a: string = '12';
	const b = rowItems.filter((cur) => cur.급여월.slice(5, 7) === a);
	console.log(b);

	return (
		<>
			<S.PayrollTitle>급여 명세서</S.PayrollTitle>
			{b.length > 0 ? <DetailModal data={b[0]} /> : <div>데이터를 불러오는 중입니다...</div>}
		</>
	);
}
