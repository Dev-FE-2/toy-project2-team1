import { formatToKoreanTime } from '@/utils/dateFormatter';
import styled from 'styled-components';
import { Toggle } from '../toggle/Toggle';

const ScheduleModal = () => {
	const dateAt = formatToKoreanTime(new Date());
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('submit');
	};
	return (
		<ModalOverlay>
			<ModalContent onSubmit={handleSubmit}>
				<h1>일정 추가</h1>
				<ModalWrapperTopSubTitle>기간</ModalWrapperTopSubTitle>
				<DateTimeInput type="datetime-local" defaultValue={dateAt} id="startAt" />
				<span> - </span>
				<DateTimeInput type="datetime-local" defaultValue={dateAt} id="endAt" />
				<ModalToggleContainer>
					<Toggle />
					<span>반복 설정</span>
					<select>
						<option>반복주기</option>
						<option>년</option>
						<option>월</option>
						<option>일</option>
					</select>
					<DateInput type="date" defaultValue={dateAt} />
				</ModalToggleContainer>
				<WorkWrapper>
					<WorkTitle>업무</WorkTitle>
					<WorkUl>
						<WorkLITitle>시간</WorkLITitle>
						<li>
							<input type="checkbox" value={'오픈'} id="open" />
							<label htmlFor="open">오픈</label>
						</li>
						<li>
							<input type="checkbox" value={'미들'} id="middle" />
							<label htmlFor="middle">미들</label>
						</li>
						<li>
							<input type="checkbox" value={'마감'} id="close" />
							<label htmlFor="close">마감</label>
						</li>
					</WorkUl>
					<WorkUl>
						<WorkTitle>종류</WorkTitle>
						<li>
							<input type="checkbox" value={'오픈'} id="open" />
							<label htmlFor="open">매표</label>
						</li>
						<li>
							<input type="checkbox" value={'미들'} id="middle" />
							<label htmlFor="middle">매점</label>
						</li>
						<li>
							<input type="checkbox" value={'마감'} id="close" />
							<label htmlFor="close">플로어</label>
						</li>
					</WorkUl>
					<TodoInput type="text" />
					<StatusContainer>
						<StatusWarpperTop>
							<span>상태</span>
							<select>
								<option>시작전</option>
								<option>진행중</option>
								<option>완료</option>
							</select>
						</StatusWarpperTop>
						<StatusWrapper>
							<span>컬러</span>
							<RoundList>
								<RoundListItem />
								<RoundListItem />
								<RoundListItem />
								<RoundListItem />
								<RoundListItem />
							</RoundList>
						</StatusWrapper>
					</StatusContainer>
				</WorkWrapper>
				<ButtonContainer>
					<CreateButton type="submit">추가하기</CreateButton>
				</ButtonContainer>
			</ModalContent>
		</ModalOverlay>
	);
};

export default ScheduleModal;

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalContent = styled.form`
	background: white;
	padding: 20px;
	border-radius: 8px;
	min-width: 300px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalWrapperTopSubTitle = styled.h2`
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const ModalToggleContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;
	margin-top: 1rem;
`;

const DateTimeInput = styled.input`
	border: none;
	font-size: 20px;
	&:focus {
		border: none;
		outline: none;
	}
	&::-webkit-calendar-picker-indicator {
		//아이콘 custom
		/* background-image: url('your-icon-url.png'); */
		background-size: contain;
		background-repeat: no-repeat;
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
`;

const DateInput = styled.input`
	border: none;
	font-size: 14px;
	&:focus {
		border: none;
		outline: none;
	}
	&::-webkit-calendar-picker-indicator {
		//아이콘 custom
		background-image: none;
		background-size: contain;
		background-repeat: no-repeat;
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
`;

const WorkWrapper = styled.div`
	margin-top: 1rem;
	display: flex;
	justify-content: center;
	flex-direction: column;
	gap: 0.5rem;
`;

const WorkTitle = styled.h2`
	font-weight: bold;
	color: #000;
`;

const WorkUl = styled.ul`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const WorkLITitle = styled.li`
	font-weight: bold;
	color: #000;
`;

const StatusWarpperTop = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 0.2rem;
	align-items: center;
`;

const TodoInput = styled.input`
	width: 400px;
	border-radius: 10px;
	border: 1px solid black;
	height: 30px;
	padding-left: 10px;
`;

const StatusContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
const StatusWrapper = styled.div`
	display: flex;
	gap: 0.2rem;
`;

const RoundList = styled.ul`
	display: flex;
	gap: 1rem;
	margin-left: 0.8rem;
`;

const ButtonContainer = styled.div`
	float: right;
`;

const CreateButton = styled.button`
	border: var(--color-skyblue-light-dark);
	outline: var(--color-skyblue-light-dark);
	background-color: transparent;
	color: var(--color-skyblue-light-dark);
	cursor: pointer;
`;

const RoundListItem = styled.li`
	width: 15px; // 원의 가로 크기
	height: 15px; // 원의 세로 크기
	background-color: #3498db; // 배경 색
	border-radius: 50%;
`;
