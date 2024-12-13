import { useState, useEffect } from 'react';
import * as S from './MainLayout.styles';
import { CheckboxGroup, CalendarComponent } from '@/components';
import { TOGGLE_BUTTON_TEXT } from '@/types/main';
import { useMainViewportWidth } from '@/hooks/useMainViewportWidth';
import { useAppSelector } from '@/hooks/useRedux';
import { WorkingHours } from './WorkingHours';

import MainDetailModal from '../PaginatedTable/DetailModal/MainDetailModal';

//import { SalaryManage } from './SalaryManage';

export function MainLayout() {
	const year = useAppSelector((state) => state.schedule.year);
	const month = useAppSelector((state) => state.schedule.month);
	//const isLoading = useAppSelector((state) => state.schedule.isLoading);
	console.log('전역 year', year);
	console.log('전역 month', month);

	const [isLeftSectionExpanded, setIsLeftSectionExpanded] = useState(true);
	const viewportWidth = useMainViewportWidth();

	useEffect(() => {
		if (viewportWidth <= 1165) {
			setIsLeftSectionExpanded(false);
		} else {
			setIsLeftSectionExpanded(true);
		}
	}, [viewportWidth]);

	return (
		<S.MainContainer>
			<S.ToggleButton
				onClick={() => setIsLeftSectionExpanded(!isLeftSectionExpanded)}
				$isVisible={!isLeftSectionExpanded}
			>
				{isLeftSectionExpanded ? TOGGLE_BUTTON_TEXT.COLLAPSE : TOGGLE_BUTTON_TEXT.EXPAND}
			</S.ToggleButton>

			<S.LeftSection $isExpanded={isLeftSectionExpanded}>
				<CheckboxGroup />
			</S.LeftSection>

			<S.MiddleSection>
				<CalendarComponent isManagementPage={false} />
			</S.MiddleSection>

			<S.RightSection $isCollapsed={isLeftSectionExpanded}>
				<WorkingHours />

				<S.PayrollContainer>
					{/* <S.PayrollTitle>급여 명세서</S.PayrollTitle> */}
					{/* <SalaryManage /> */}
					<MainDetailModal />
				</S.PayrollContainer>
			</S.RightSection>
		</S.MainContainer>
	);
}
