import { PageDiv, PageUl, PageLi, PageButton } from './pagination.style';

interface RowItem {
	급여월: string;
	급여지급일: string;
	지급총액: string;
	실지급액: string;
}
const rowItems: RowItem[] = [
	{
		급여월: '2023-11-01',
		급여지급일: '2023-11-20',
		지급총액: '300만원',
		실지급액: '250만원',
	},
	{
		급여월: '2023-12-01',
		급여지급일: '2023-12-20',
		지급총액: '300만원',
		실지급액: '250만원',
	},
	{
		급여월: '2023-01-01',
		급여지급일: '2023-01-20',
		지급총액: '300만원',
		실지급액: '250만원',
	},
	{
		급여월: '2023-02-01',
		급여지급일: '2023-02-20',
		지급총액: '300만원',
		실지급액: '250만원',
	},
	{
		급여월: '2023-03-01',
		급여지급일: '2023-03-20',
		지급총액: '300만원',
		실지급액: '250만원',
	},
];

function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}) {
	const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1);

	return (
		<PageDiv>
			<PageUl>
				{/* 이전 버튼 */}
				<PageLi>
					<PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
						이전
					</PageButton>
				</PageLi>

				{/* 페이지 번호 */}
				{pageNumbers.map((page) => (
					<PageLi key={page}>
						<PageButton
							onClick={() => onPageChange(page)}
							style={{
								backgroundColor: currentPage === page ? 'var(--color-skyblue)' : 'transparent',
								color: currentPage === page ? 'var(--color-white)' : '#637381',
							}}
						>
							{page}
						</PageButton>
					</PageLi>
				))}

				{/* 다음 버튼 */}
				<PageLi>
					<PageButton
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						다음
					</PageButton>
				</PageLi>
			</PageUl>
		</PageDiv>
	);
}

export default Pagination;
