import { useEffect } from 'react';
import * as S from './Navbar.styles';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { persistor } from '@/redux/store'; //ㅇㅇㅇㅇㅇ
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setUser, clearUser } from '@/redux/actions/userActions';
import { db, auth } from '@/firebaseConfig';
import { clearSchedules } from '@/redux/actions/scheduleActions';

export function Navbar() {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
				const additionalData = userDoc.data();

				const userData = {
					id: currentUser.uid,
					email: currentUser.email,
					userName: additionalData?.user_name ?? '',
					userAlias: additionalData?.user_alias ?? '',
					age: additionalData?.age ?? 0,
					role: additionalData?.role ?? '',
					gender: additionalData?.gender ?? '',
				};

				dispatch(setUser(userData));
			} else {
				dispatch(clearUser());
			}
		});

		return () => unsubscribe();
	}, []);

	const handleLogout = async () => {
		try {
			await persistor.purge(); // Redux Persist 저장소 초기화
			dispatch(clearSchedules()); // Redux 상태 초기화
			await signOut(auth);
		} catch (error) {
			console.error('로그아웃 에러:', error);
		}
	};

	return (
		<S.NavContainer>
			<Link to={user ? '/' : '/login'}>홈</Link>
			{user ? (
				<>
					<Link to="/salary-details">급여 내역</Link>
					<Link to="/schedule-management">일정 관리</Link>
					<Link to="/profile">프로필</Link>
					<Link to="#" onClick={handleLogout}>
						로그아웃
					</Link>
				</>
			) : (
				<>
					<Link to="/register">회원가입</Link>
					<Link to="/login">로그인</Link>
				</>
			)}
		</S.NavContainer>
	);
}
