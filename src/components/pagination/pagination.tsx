import styled from 'styled-components';

const PageBox = styled.div`
	padding: 40px 0px;
`;

const PageUl = styled.ul`
	display: flex;
	justify-content: center;
	color: #637381;
	list-style: none;
`;

const PageLi = styled.li`
	width: 34px;
	height: 34px;
	margin-right: 8px;
	border: 1px solid #dfe4ea;
	line-height: 34rem;
	border-radius: 6px;
	text-align: center;
	list-style: none;

	&.isActive {
		background-color: #cde1f8;
		color: #fff;
	}
`; // IsActive class로 focus 지정

const PageButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
`;

export default function Pagination() {
	return (
		<PageBox>
			<PageUl>
				<PageLi>
					<NumberButton>svg</NumberButton>
				</PageLi>

				<PageLi>
					<NumberButton>1</NumberButton>
				</PageLi>

				<PageLi>
					<NumberButton>svg</NumberButton>
				</PageLi>
			</PageUl>
		</PageBox>
	);
}

type BtnProps = {
	children: React.ReactNode;
};

function NumberButton({ children }: BtnProps) {
	return <PageButton>{children}</PageButton>;
}
