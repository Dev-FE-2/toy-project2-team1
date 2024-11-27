import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/components/register/RegisterForm';
import { useRegister, RegisterData } from '@/hooks/useRegister';

export function Register() {
	const navigate = useNavigate();
	const { register, isLoading, error } = useRegister();

	const handleRegister = async (formData: RegisterData) => {
		try {
			await register(formData);
			alert('회원가입이 완료되었습니다.');
			navigate('/login');
		} catch (err) {
			console.error('Registration error:', err);
		}
	};

	return <RegisterForm onSubmit={handleRegister} isSubmitting={isLoading} submitError={error} />;
}
