import styled from 'styled-components';

export const ProfileContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	height: 900px;
	padding: var(--space-medium);
	margin-left: 20%;
`;

export const FormContainer = styled.div`
	background: var(--color-white);
	padding: var(--space-large);
	border-radius: var(--medium-border-radius);
	box-shadow: var(--box-shadow--medium);
	width: 100%;
	max-width: 500px;
`;

export const FormTitle = styled.h2`
	text-align: center;
	margin-bottom: var(--space-large);
	color: var(--color-black);
	font-size: var(--font-xxlarge);
`;

export const FormField = styled.div`
	margin-bottom: var(--space-medium);
`;

export const Label = styled.label`
	display: block;
	margin-bottom: var(--space-xsmall);
	color: var(--color-regular-gray);
	font-size: var(--font-medium);
`;

export const Input = styled.input`
	width: 100%;
	padding: var(--space-small);
	border: 1px solid
		${(props) => (props.disabled ? 'var(--color-light-gray)' : 'var(--color-regular-gray)')};
	border-radius: var(--small-border-radius);
	background-color: ${(props) =>
		props.disabled ? 'var(--color-background)' : 'var(--color-white)'};
	font-size: var(--font-medium);
`;

export const Select = styled.select`
	width: 100%;
	padding: var(--space-small);
	border: 1px solid
		${(props) => (props.disabled ? 'var(--color-light-gray)' : 'var(--color-regular-gray)')};
	border-radius: var(--small-border-radius);
	background-color: ${(props) =>
		props.disabled ? 'var(--color-background)' : 'var(--color-white)'};
	font-size: var(--font-medium);
`;

export const CheckboxGroup = styled.div`
	display: flex;
	gap: var(--space-small);
	flex-wrap: wrap;
`;

export const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	gap: var(--space-xsmall);
	font-size: var(--font-medium);
	color: var(--color-black);
`;

export const ButtonGroup = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: flex-end;
	margin-top: 2rem;
`;

export const Button = styled.button<{ primary?: boolean }>`
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 4px;
	background-color: ${(props) => (props.primary ? '#1a73e8' : '#f5f5f5')};
	color: ${(props) => (props.primary ? 'white' : '#666')};
	cursor: pointer;

	&:hover {
		background-color: ${(props) => (props.primary ? '#1557b0' : '#e8e8e8')};
	}
`;
