import styled from 'styled-components';

interface StyledInputProps {
	borderColor?: string;
	focusColor?: string;
}

export const StyledInput = styled.input<StyledInputProps>`
	padding: 10px 20px;
	border: 1px solid ${({ borderColor }) => borderColor || 'var(--color-light-gray)'};
	border-radius: 6px;
	font-size: 14rem;
	box-sizing: border-box;

	&:focus {
		outline: 1px solid ${({ focusColor }) => focusColor || 'var(--color-skyblue)'};
	}
`;

export const StyledHelperText = styled.div`
	padding: 8px 4px 0;
	text-align: left;
	font-size: 12px;
`;
