import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import * as S from './Profile.styles';
import { TUser } from '@/types/auth';
import { ROLE_OPTIONS, GENDER_OPTIONS } from '@/types/register';

import { Navigate } from 'react-router-dom';
import { useLoginAuthObserver } from '@/hooks/useLoginAuthObserver';

// 날짜 변환 함수 추가
const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export function Profile() {
	const { user, isAuthInitialized } = useAppSelector((state) => state.user);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<TUser | null>(null);
	// const [workHours, setWorkHours] = useState({
	//    weekly: '0',
	//    monthly: '0',
	// });

	useLoginAuthObserver();

	useEffect(() => {
		if (user) {
			setFormData(user);
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
				<S.TitleContainer>
					<S.TitleGroup>
						<S.FormTitle>프로필</S.FormTitle>
						<S.FormSubTitle>개인정보 및 설정</S.FormSubTitle>
					</S.TitleGroup>
					{!isEditing && <S.EditButton onClick={() => setIsEditing(true)}>수정</S.EditButton>}
				</S.TitleContainer>

				<S.FormField>
					<S.Label>이름</S.Label>
					<S.Value>
						<S.Input value={formData.userName} disabled={!isEditing} />
					</S.Value>
				</S.FormField>

				<S.FormField>
					<S.Label>이메일</S.Label>
					<S.Value>
						<S.Input value={formData.email || ''} disabled />
					</S.Value>
				</S.FormField>

				<S.FormField>
					<S.Label>전화번호</S.Label>
					<S.Value>
						<S.Input value="firestore에 필드 추가 예정" disabled={!isEditing} />
					</S.Value>
				</S.FormField>

				<S.FormField>
					<S.Label>직책</S.Label>
					<S.Value>
						<S.Input value={formData.role ? ROLE_OPTIONS[formData.role].label : ''} disabled />
					</S.Value>
				</S.FormField>

				<S.FormField>
					<S.Label>성별</S.Label>
					<S.Value>
						<select
							value={formData.gender}
							disabled={!isEditing}
							onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
						>
							{Object.values(GENDER_OPTIONS).map((gender) => (
								<option key={gender.value} value={gender.value}>
									{gender.label}
								</option>
							))}
						</select>
					</S.Value>
				</S.FormField>

				<S.FormField>
					<S.Label>입사일</S.Label>
					<S.Value>
						<S.Input value={formData.created_at ? formatDate(formData.created_at) : ''} disabled />
					</S.Value>
				</S.FormField>

				{isEditing && (
					<S.ButtonGroup>
						<S.Button onClick={() => setIsEditing(false)}>취소</S.Button>
						<S.Button primary>저장하기</S.Button>
					</S.ButtonGroup>
				)}
			</S.FormContainer>
		</S.ProfileContainer>
	);
}
