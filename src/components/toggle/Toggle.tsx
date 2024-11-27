import { useState } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
	position: relative;
	cursor: pointer;

	> .toggle-container {
		width: 50px;
		height: 24px;
		border-radius: 30px;
		background-color: rgb(233, 233, 234);
	}
	> .toggle--checked {
		background-color: var(--color-black);
		transition: 0.5s;
	}

	> .toggle-circle {
		position: absolute;
		top: 1px;
		left: 1px;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background-color: rgb(255, 254, 255);
		transition: 0.5s;
		//.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
	}
	> .toggle--checked {
		left: 27px;
		transition: 0.5s;
	}
`;

export const Toggle = () => {
	const [isOn, setisOn] = useState(false);

	const toggleHandler = () => {
		setisOn(!isOn);
	};

	return (
		<>
			<ToggleContainer onClick={toggleHandler}>
				<div className={`toggle-container ${isOn ? 'toggle--checked' : null}`} />
				<div className={`toggle-circle ${isOn ? 'toggle--checked' : null}`} />
			</ToggleContainer>
		</>
	);
};
