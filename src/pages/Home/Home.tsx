import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import * as S from './Home.styles';
import { Button, Error, Loading } from '@/components';

export function Home() {
	useEffect(() => {
		const testFirebaseConnection = async () => {
			try {
				await setDoc(doc(db, 'testCollection', 'testDoc'), {
					testField: 'Hello, Firebase!',
				});
				console.log('Firebase connection successful!');
			} catch (error) {
				console.error('Error connecting to Firebase:', error);
			}
		};

		testFirebaseConnection();
	}, []);

	const [status] = useState({
		isError: false,
		isLoading: true,
	});

	return (
		<S.HomeContainer>
			<h2>Home Page</h2>
			<Button color="regular-gray" shape="line" onClick={() => alert('버튼 클릭됨')}>
				테스트 버튼
			</Button>
			{status.isError && <Error>오류 발생</Error>}
			{status.isLoading && <Loading size={40} />}
			{/* 홈 페이지 내용 */}
		</S.HomeContainer>
	);
}
