'use client';

import { logout } from '@/lib/fetch-apis';
import { Button } from './ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LogOutButton = () => {
	const [pending, setPending] = useState<boolean>(false);
	const router = useRouter();

	const handleLogout = async () => {
		const response = await logout();
		router.push('/');
	};

	return (
		<Button onClick={handleLogout} disabled={pending}>
			Log Out
		</Button>
	);
};

export default LogOutButton;
