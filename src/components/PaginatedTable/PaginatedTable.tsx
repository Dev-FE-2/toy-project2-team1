import { useState } from 'react';
import Table from '../table/table';
import Pagination from '../pagination/pagination';

interface TableUIProps {
	data: RowItem[];
}

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
const itemsPerPage = 8;

export default function PaginatedTable() {
	const [currentPage, setCurrentPage] = useState(1);

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedData: RowItem[] = rowItems.slice(startIndex, endIndex);

	const totalPages = Math.ceil(rowItems.length / itemsPerPage);

	return (
		<>
			<Table data={paginatedData} />
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</>
	);
}
