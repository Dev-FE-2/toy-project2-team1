import styled from 'styled-components';

export const MainContainer = styled.main`
	min-height: 100vh;
	background-color: var(--color-pale-gray-light);
	padding: 24px;
`;

export const FlexContainer = styled.div`
	display: flex;
	gap: 24px;
`;

export const LeftSection = styled.div`
	width: 200px;
	height: 810px;
	background-color: white;
	border-radius: 8px;
	box-shadow: var(--box-shadow-large);
	padding: 24px;
`;

export const CategoryTitle = styled.h2`
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 16px;
`;

export const CategoryList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const CategoryItem = styled.li`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const MiddleSection = styled.div`
	flex: 1;
	min-width: 500px;
	height: 810px;
	background-color: white;
	border-radius: 8px;
	box-shadow: var(--box-shadow-large);
	padding: 24px;
`;

export const RightSection = styled.div`
	min-width: 320px;
	height: 810px;
	display: flex;
	flex-direction: column;
	gap: 24px;
`;

export const WorkingHoursContainer = styled.div`
	background-color: white;
	border-radius: 8px;
	box-shadow: var(--box-shadow-large);
	padding: 10px 24px;
	height: 190px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const WorkingHoursWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	justify-content: center;
`;

export const WorkingHoursInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const ChartContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const WorkTimeChart = styled.div<{ $percentage: number }>`
	position: relative;
	width: 80px;
	height: 80px;
	background: conic-gradient(
		#60a5fa 0% ${(props) => props.$percentage}%,
		#e5e7eb ${(props) => props.$percentage}% 100%
	);
	border-radius: 50%;

	&::after {
		content: '';
		position: absolute;
		top: 10%;
		left: 10%;
		right: 10%;
		bottom: 10%;
		background-color: white;
		border-radius: 50%;
	}
`;

export const ChartCenter = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
	font-size: 24px;
	font-weight: bold;
`;

export const InfoLabel = styled.p`
	font-size: 14px;
	color: var(--color-regular-gray);
`;

export const InfoValue = styled.p`
	font-size: 18px;
	font-weight: bold;
`;

export const PayrollContainer = styled.div`
	background-color: white;
	border-radius: 8px;
	box-shadow: var(--box-shadow-large);
	padding: 24px;
	flex: 1;
`;

export const PayrollTitle = styled.h3`
	font-size: 18px;
	font-weight: bold;
`;
