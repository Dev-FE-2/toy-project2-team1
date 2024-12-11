import CheckboxItem from './CheckboxItem';
import styled from 'styled-components';

export const CheckboxGroup = () => {
	const categoryMap = {
		all: '전체',
		ticket: '매표',
		snack: '매점',
		floor: '플로어',
	} as const;

	return (
		<CheckboxContiner>
			<h3>카테고리</h3>
			<CheckboxUL>
				{Object.entries(categoryMap).map(([key, value]) => (
					<CheckboxItem item={value} categoryKey={key} key={key} />
				))}
			</CheckboxUL>
		</CheckboxContiner>
	);
};

const CheckboxContiner = styled.div`
	display: flex;
	flex-direction: column;
	padding: var(--space-large) var(--space-xlarge) var(--space-large) var(--space-medium);
	gap: var(--space-large);
	white-space: nowrap;
	overflow-y: auto;

	h3 {
		font-size: var(--font-medium);
		font-weight: 700;
	}
`;

const CheckboxUL = styled.ul`
	display: flex;
	flex-direction: column;
	gap: var(--space-small);
`;
