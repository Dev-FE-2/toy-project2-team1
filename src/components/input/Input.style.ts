import styled from 'styled-components';

export const StyledInput = styled.input`
	padding: 1rem 2rem;
	border: 1px solid #dfe4ea;
	border-radius: 6px;
	font-size: 1.4rem;
	box-sizing: border-box;

	&:focus {
		outline: 1px solid #cde1f8;
	}
`;

export const StyledHelperText = styled.div`
	padding: 0.8rem 0.4rem 0;
	text-align: left;
	font-size: 1.2rem;
`;
