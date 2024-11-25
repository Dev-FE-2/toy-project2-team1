import { useState } from 'react';
import { useFirestoreUserRegistration } from '@/hooks/useFirestoreUserRegistration';
import { useNavigate } from 'react-router-dom';
import * as S from './Register.styles';

export function Register() {
	const { registerWithUserId } = useFirestoreUserRegistration();
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleRegister = async () => {
		const isRegistered = await registerWithUserId(userId, password);
		if (isRegistered) {
			console.log('Registration successful!');
			navigate('/login');
		} else {
			setError('User ID already exists. Please choose another one.');
		}
	};

	return (
		<S.RegisterContainer>
			<h2>Register</h2>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<input
				type="text"
				placeholder="Enter User ID"
				value={userId}
				onChange={(e) => setUserId(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Enter Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleRegister}>Register</button>
		</S.RegisterContainer>
	);
}
