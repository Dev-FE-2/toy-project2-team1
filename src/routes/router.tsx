import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layout/Layout';
import {
	Home,
	Login,
	Register,
	Profile,
	SalaryManagement,
	CorrectionRequest,
	ScheduleManagement,
	NotFound,
} from '../pages';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <NotFound />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/login', element: <Login /> },
			{ path: '/register', element: <Register /> },
			{ path: '/profile', element: <Profile /> },
			{ path: '/salary-management', element: <SalaryManagement /> },
			{ path: '/correction-request', element: <CorrectionRequest /> },
			{ path: '/schedule-management', element: <ScheduleManagement /> },
		],
	},
]);
