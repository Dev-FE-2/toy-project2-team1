import { TableContainer, Lists, InnerUnorderLists, InnerLists } from './table.styled';

interface RowItem {
	급여월: string;
	급여지급일: string;
	지급총액: string;
	실지급액: string;
}

export default function Table({ data, headerItems, test }) {
	return (
		<TableContainer>
			<ul>
				<Lists background="#f1f1f1">
					<InnerUnorderLists>
						{headerItems.map((cur, idx) => (
							<InnerLists key={idx}>{cur}</InnerLists>
						))}
					</InnerUnorderLists>
				</Lists>

				{test.map((row, idx) => (
					<Lists key={idx}>
						<InnerUnorderLists>
							{headerItems.map((header, idx1) => (
								<InnerLists key={idx1}>{row[header as keyof RowItem] ?? ''}</InnerLists>
							))}
						</InnerUnorderLists>
					</Lists>
				))}
			</ul>
		</TableContainer>
	);
}
