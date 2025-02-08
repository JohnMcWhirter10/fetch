'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { login } from '@/lib/fetch-apis';
import { useRouter } from 'next/navigation';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const router = useRouter();
	const [pending, setPending] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setPending(true);

		const formData = new FormData(e.currentTarget);

		const name = formData.get('name');
		if (!name) {
			setMessage('Name is Required');
			setPending(false);

			return;
		}

		const email = formData.get('email');
		if (!email) {
			setMessage('Email is Required');
			setPending(false);

			return;
		}

		const response = await login(name as string, email as string);

		if (!response.ok) {
			setMessage('Invalid Credentials');
			setPending(false);
			return;
		}

		setPending(false);
		router.push('/dogs/search');
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
					{message && <CardDescription className='text-destructive'>{message}</CardDescription>}
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit}>
						<div className='flex flex-col gap-6'>
							<div className='grid gap-2'>
								<div className='flex items-center'>
									<Label htmlFor='name'>Name</Label>
								</div>
								<Input id='name' name='name' required />
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='email'>Email</Label>
								<Input id='email' name='email' type='email' placeholder='m@example.com' required />
							</div>
							<Button type='submit' className='w-full' disabled={pending}>
								Login
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
