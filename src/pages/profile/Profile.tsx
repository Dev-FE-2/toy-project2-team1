import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import * as S from './Profile.styles';
import { TUser } from '@/types/auth';
import {
	POSITION_OPTIONS,
	SHIFT_TYPE_OPTIONS,
	ROLE_OPTIONS,
	GENDER_OPTIONS,
} from '@/types/register';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { setUser, clearUser } from '@/redux/actions/userAction';
import { Navigate } from 'react-router-dom';

export function Profile() {
	const dispatch = useAppDispatch();
	const { user, isAuthInitialized } = useAppSelector((state) => state.user);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<TUser | null>(null);
	// const [workHours, setWorkHours] = useState({
	// 	weekly: '0',
	// 	monthly: '0',
	// });
	const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
	const [selectedShiftTypes, setSelectedShiftTypes] = useState<string[]>([]);

	useEffect(() => {
		// auth 상태 변경 감지
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				// Firestore에서 유저 정보 가져오기
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
					position: additionalData?.position ?? '',
					shiftType: additionalData?.shift_type ?? '',
				};

				dispatch(setUser(userData));
			} else {
				dispatch(clearUser());
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			setFormData(user);
			setSelectedPositions([user.position]);
			setSelectedShiftTypes([user.shiftType]);
		}
	}, [user]);

	// 인증 초기화 전이면 로딩 표시
	if (!isAuthInitialized) return <div>Initializing...</div>;

	// 인증은 됐지만 user가 없으면 로그인 페이지로 리다이렉트
	if (isAuthInitialized && !user) {
		return <Navigate to="/login" />;
	}

	if (!formData) return <div>Loading...</div>;

	return (
		<S.ProfileContainer>
			<S.FormContainer>
				<S.FormTitle>프로필</S.FormTitle>
				<S.FormField>
					<S.Label>이메일</S.Label>
					<S.Input value={formData.email || ''} disabled />
				</S.FormField>

				<S.FormField>
					<S.Label>이름</S.Label>
					<S.Input value={formData.userName} disabled={!isEditing} />
				</S.FormField>

				<S.FormField>
					<S.Label>별명</S.Label>
					<S.Input value={formData.userAlias} disabled={!isEditing} />
				</S.FormField>

				<S.FormField>
					<S.Label>나이</S.Label>
					<S.Input value={formData.age} type="number" disabled={!isEditing} />
				</S.FormField>

				<S.FormField>
					<S.Label>성별</S.Label>
					<S.Select value={formData.gender} disabled={!isEditing}>
						{Object.values(GENDER_OPTIONS).map((gender) => (
							<option key={gender.value} value={gender.value}>
								{gender.label}
							</option>
						))}
					</S.Select>
				</S.FormField>

				<S.FormField>
					<S.Label>직책</S.Label>
					<S.Select value={formData.role} disabled={!isEditing}>
						{Object.values(ROLE_OPTIONS).map((role) => (
							<option key={role.value} value={role.value}>
								{role.label}
							</option>
						))}
					</S.Select>
				</S.FormField>

				<S.FormField>
					<S.Label>근무 포지션</S.Label>
					<S.CheckboxGroup>
						{Object.values(POSITION_OPTIONS).map((position) => (
							<S.CheckboxLabel key={position.value}>
								<input
									type="checkbox"
									checked={selectedPositions.includes(position.value)}
									disabled={!isEditing}
								/>
								{position.label}
							</S.CheckboxLabel>
						))}
					</S.CheckboxGroup>
				</S.FormField>

				<S.FormField>
					<S.Label>근무 시간대</S.Label>
					<S.CheckboxGroup>
						{Object.values(SHIFT_TYPE_OPTIONS).map((shift) => (
							<S.CheckboxLabel key={shift.value}>
								<input
									type="checkbox"
									checked={selectedShiftTypes.includes(shift.value)}
									disabled={!isEditing}
								/>
								{shift.label}
							</S.CheckboxLabel>
						))}
					</S.CheckboxGroup>
				</S.FormField>
				{/*
				<S.FormField>
					<S.Label>가입일</S.Label>
					<S.Input value={formData.createdAt} disabled />
				</S.FormField> */}

				{/*<S.FormField>*/}
				{/*	<S.Label>이번 주 근무시간</S.Label>*/}
				{/*	<S.Input value={workHours.weekly} disabled />*/}
				{/*</S.FormField>*/}

				{/*<S.FormField>*/}
				{/*	<S.Label>이번 달 근무시간</S.Label>*/}
				{/*	<S.Input value={workHours.monthly} disabled />*/}
				{/*</S.FormField>*/}

				<S.ButtonGroup>
					{isEditing ? (
						<>
							<S.Button onClick={() => setIsEditing(false)}>취소</S.Button>
							<S.Button primary>저장</S.Button>
						</>
					) : (
						<S.Button onClick={() => setIsEditing(true)}>수정</S.Button>
					)}
				</S.ButtonGroup>
			</S.FormContainer>
		</S.ProfileContainer>
	);
}
