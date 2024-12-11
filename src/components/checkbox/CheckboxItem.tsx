import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { getSchedulesFromSupabase } from '@/redux/actions/scheduleActions';

import styled from 'styled-components';

interface CheckboxItemProps {
	categoryKey: string;
	item: '매표' | '매점' | '플로어' | '전체'; // categoryMap의 value
}

const CheckboxItem = ({ item, categoryKey }: CheckboxItemProps) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);

	const userId = user?.id;
	const handleFilteredClick = (e) => {
		const id = e.target.id as string;
		if (categoryKey === 'all') {
			dispatch(getSchedulesFromSupabase(userId));
		}
		dispatch(getSchedulesFromSupabase(userId, id));
	};

	return (
		<ListItem>
			<Label htmlFor={item}>
				<RadioInput
					type="radio"
					name="option"
					id={categoryKey}
					onChange={(e) => handleFilteredClick(e)}
					defaultChecked={categoryKey === 'all'}
				/>
				<RadioText>{item}</RadioText>
			</Label>
		</ListItem>
	);
};

export default CheckboxItem;

const ListItem = styled.li`
	list-style: none;
	margin-bottom: 8px;

	display: flex;
`;

const Label = styled.label`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const RadioInput = styled.input`
	transform: scale(1.5); /* 크기를 1.5배로 확대 */
	margin-right: 10px;
	margin-bottom: 5px;
`;

const RadioText = styled.span`
	font-size: 20px;
`;
