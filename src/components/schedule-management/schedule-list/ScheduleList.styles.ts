import styled from 'styled-components';

export const ScheduleListContainer = styled.div`
	padding: var(--space-medium);
	border-radius: var(--medium-border-radius);
	box-shadow: var(--box-shadow-large);
	.time {
		color: var(--color-blue);
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-small);
	}
`;
