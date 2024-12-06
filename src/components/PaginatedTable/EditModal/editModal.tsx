import { ModalBox, Info, TextArea, Label } from './editModal.style';
import { createClient } from '@supabase/supabase-js';
import { useState, useRef } from 'react';
import { Button } from '@/pages';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const EditModal = ({ data = {} }) => {
	console.log('EditModal Rendered!!');
	const [updatedAmount, setUpdatedAmount] = useState('');
	const [reason, setReason] = useState('');
	const fileRef = useRef<HTMLInputElement | null>(null);
	const [uploading, setUploading] = useState(false);

	const handleFileUpload = async (file: File) => {
		console.log('handleFileUpload 호출됨');
		setUploading(true);

		try {
			// 파일 이름을 영문자로 변경하고 인코딩 처리
			const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // 특수 문자를 "_"로 변경
			const filePath = `corrections/${encodeURIComponent(fileName)}`;

			const { error } = await supabase.storage.from('SalaryFile').upload(filePath, file);

			if (error) {
				console.error('파일 업로드 실패:', error.message);
				throw new Error('파일 업로드에 실패했습니다.');
			}

			// 파일의 public URL을 가져오기
			const publicUrlResponse = supabase.storage.from('SalaryFile').getPublicUrl(filePath);
			if (!publicUrlResponse.data || !publicUrlResponse.data.publicUrl) {
				throw new Error('URL 생성 실패');
			}

			console.log('Public URL:', publicUrlResponse.data.publicUrl);
			return publicUrlResponse.data.publicUrl;
		} finally {
			setUploading(false);
		}
	};
	//버튼 클릭시 호출되는 함수 => console에 file이 null로 나와서 alert뜹니다
	const handleSubmit = async () => {
		const file = fileRef.current?.files?.[0];
		console.log('제출 시 file 상태:', file);

		if (!updatedAmount || !reason || !file) {
			alert('필수 항목을 모두 입력해주세요.');
			return;
		}

		try {
			const fileURL = await handleFileUpload(file);

			const { error } = await supabase.from('attendance_request').insert([
				{
					attendance: data['id'],
					requested_amount: updatedAmount,
					reason: reason,
					evidence: fileURL,
				},
			]);

			if (error) {
				console.error('데이터 삽입 실패:', error);
				alert('전송 실패했습니다.');
			} else {
				alert('전송 완료!');
			}
		} catch (err) {
			console.error('파일 업로드 중 오류 발생:', err);
			alert('파일 업로드에 실패했습니다.');
		}
	};

	return (
		<ModalBox>
			<div style={{ margin: '20px' }}>
				<Info>
					<p>신청인: {data['이름']}</p>
					<p>급여월: {data['급여월']}</p>
					<p>급여지급일: {data['급여지급일']}</p>
				</Info>
				<Info>
					<p>기존금액: {data['실지급액']}</p>
					<p>
						정정신청급액:{' '}
						<input
							type="text"
							value={updatedAmount}
							onChange={(e) => setUpdatedAmount(e.target.value)}
						/>
					</p>
				</Info>
				<p style={{ justifySelf: 'flex-start' }}>신청사유</p>
				<TextArea
					placeholder="신청 사유를 입력하세요."
					value={reason}
					onChange={(e) => setReason(e.target.value)}
				/>
				<div>
					<Label>
						<input ref={fileRef} type="file" style={{ display: 'none' }} />
						증거자료첨부
					</Label>
				</div>
			</div>
			<Button color="blue" shape="line" onClick={handleSubmit}>
				{uploading ? '업로드 중...' : '제출하기'}
			</Button>
		</ModalBox>
	);
};

export default EditModal;
