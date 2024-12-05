import { Button } from '@/components';
import * as S from './SalaryManagement.styles';
import { useEffect, useState } from 'react';
import { ConfirmModal, Modal } from '@/components/modal/Modal';
import ModalPortal from '@/components/modal/ModalPortal';
import Table, { RowItem } from '@/components/table/table';
import Pagination from '@/components/pagination/pagination';
import SalarySelect from '@/components/salaryselect/salarySelect';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type Message = {
	confirm: string;
	leftBtn: string;
	rightBtn: string;
};

interface ManageRowItem extends RowItem {
	신청인: string;
	급여월: string;
	급여지급일: string;
	지급예정금액: string;
}

export function SalaryManagement() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRow, setSelectedRow] = useState<ManageRowItem | null>(null);

	const openModal = (row) => {
		setSelectedRow(row);
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setSelectedRow(null);
		setIsModalOpen(false);
	};

	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	const openConfirmModal = () => setIsConfirmModalOpen(true);
	const closeConfirmModal = () => setIsConfirmModalOpen(false);

	const headerItems: string[] = ['신청인', '급여월', '급여지급일', '지급예정금액', '상태'];
	const [attendanceRequestData, setAttendanceRequestData] = useState<ManageRowItem[]>([]);
	const [selectedYear, setSelectedYear] = useState<string>('2024');
	const [selectedMonth, setSelectedMonth] = useState<string>('02');

	//페이지네이션 변수들
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	useEffect(() => {
		const pageSize = 5;

		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		let totalCount = 0;

		const getAttendanceRuestCount = async () => {
			const { count, error: countError } = await supabase
				.from('attendance_request')
				.select(
					`
					id,
					status,
					created_at,
					attendance!inner (
						payment_month
					)
				`,
					{ count: 'exact' },
				)
				.eq('attendance.payment_month', `${selectedYear}-${selectedMonth}`);
			if (countError) {
				console.error('Error fetching total count:', countError);
			} else {
				totalCount = count || 0;
			}
			console.log(totalCount);
			setTotalPage(Math.ceil(totalCount / pageSize));
		};

		const fetchAttendanceRequestData = async () => {
			const { data, error } = await supabase
				.from('attendance_request')
				.select(
					`
					created_at,
					status,
					id,
					attendance!inner (
						user_name,
						payment_month,
						payment_day,
						total_salary
					)
				`,
				)
				.eq('attendance.payment_month', `${selectedYear}-${selectedMonth}`)
				.order('created_at', { ascending: false })
				.range(startIndex, endIndex);
			if (error) {
				console.error('Error fetching data:', error);
			} else {
				console.log(data);
				const reorderedData: ManageRowItem[] = data.map((item) => ({
					신청인: item?.attendance?.user_name,
					급여월: item.attendance?.payment_month,
					급여지급일: item.attendance?.payment_day,
					지급예정금액: item.attendance?.total_salary,
					상태: item.status,
				}));
				setAttendanceRequestData(reorderedData);
			}
		};
		getAttendanceRuestCount();
		fetchAttendanceRequestData();
	}, [selectedYear, selectedMonth]);

	useEffect(() => {
		console.log('attendanceRequestData has been updated:', attendanceRequestData);
	}, [attendanceRequestData]);

	const message: Message = {
		confirm: '급여 정정을 승인하시겠습니까?',
		leftBtn: '네',
		rightBtn: '아니오',
	};

	return (
		<S.SalaryManagementContainer>
			<SalarySelect
				value={selectedYear}
				value1={selectedMonth}
				onChange={(value) => {
					setSelectedYear(value);
				}}
				onChange1={(value1) => {
					setSelectedMonth(value1);
				}}
			/>
			<Table
				data={attendanceRequestData}
				headerItems={headerItems}
				btnContent={{
					btnText: '대기 중',
					btnColor: 'green',
					onClickBtn: (row) => openModal(row),
				}}
			>
				{isModalOpen && selectedRow && (
					<ModalPortal>
						<Modal onClose={closeModal}>
							{/* 모달 내용 */}
							<Button color="blue" shape="line" onClick={openConfirmModal}>
								처리하기
							</Button>
							{isConfirmModalOpen && (
								<ModalPortal>
									<ConfirmModal
										onClose={closeConfirmModal}
										message={message}
										color={'blue'}
										onClickLeftBtn={test}
										onClickRightBtn={test}
									/>
								</ModalPortal>
							)}
						</Modal>
					</ModalPortal>
				)}
			</Table>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPage}
				onPageChange={handlePageChange}
			/>
		</S.SalaryManagementContainer>
	);
}
const test = () => {
	console.log('test');
};
