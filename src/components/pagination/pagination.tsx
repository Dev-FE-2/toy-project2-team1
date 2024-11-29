import { PageDiv, PageUl, PageLi, PageButton } from './pagination.style';

export default function Pagination() {
	return (
		<PageDiv>
			<PageUl>
				<PageLi>
					<PageButton>1</PageButton>
				</PageLi>
				<PageLi>
					<PageButton>2</PageButton>
				</PageLi>
				<PageLi>
					<PageButton>3</PageButton>
				</PageLi>
			</PageUl>
		</PageDiv>
	);
}
