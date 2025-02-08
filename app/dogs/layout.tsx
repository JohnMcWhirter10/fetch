import GenerateMatch from '@/components/generate-match';
import LogOutButton from '@/components/logout-button';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const HomeLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const cookieStore = await cookies();
	const token = cookieStore.get('fetch-access-token');

	if (token) redirect('/home');

	return (
		<>
			<div className='fixed left-5 top-5'>
				<LogOutButton />
			</div>
			<div className='fixed left-5 top-16'>
				<GenerateMatch />
			</div>

			<div className='absolute pl-36 w-full -z-10'>{children}</div>
		</>
	);
};

export default HomeLayout;
