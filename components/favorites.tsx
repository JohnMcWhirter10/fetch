'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dog } from '@/lib/types';
import { Button } from './ui/button';
import { TrashIcon, X } from 'lucide-react';
import { Card, CardContent, CardTitle } from './ui/card';
import DogDialog from './dog-dialog';

const Favorites = () => {
	const [favorites, setFavorites] = useState<Dog[]>([]);

	useEffect(() => {
		const saved = localStorage.getItem('favorites');
		if (saved) {
			setFavorites(JSON.parse(saved) as Dog[]);
		}
	}, []);

	const removeFromFavorites = (dog: Dog) => {
		const updatedFavorites = favorites.filter((fav) => fav.id !== dog.id);
		setFavorites(updatedFavorites);
		localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
	};

	return (
		<Card className='w-full p-6 space-y-4 text-nowrap'>
			<CardTitle>Your Favorites</CardTitle>
			<CardContent>
				<Table className='w-full border border-gray-200 shadow-sm rounded-md'>
					<TableBody>
						{favorites.length > 0 ? (
							favorites.map((dog) => (
								<TableRow key={dog.id} className='hover:bg-gray-50 transition'>
									<TableCell className='text-right text-2xl'>{dog.name}</TableCell>
									<TableCell className='flex items-center justify-center'>
										<DogDialog dog={dog} />
									</TableCell>
									<TableCell>
										<Button
											variant='destructive'
											onClick={() => removeFromFavorites(dog)}
											className='flex items-center gap-1 px-3 py-1'
										>
											<X />
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} className='text-center p-6 text-gray-500'>
									No Favorites. 🥺
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default Favorites;
