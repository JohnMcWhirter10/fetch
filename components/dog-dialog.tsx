import { Dog } from '@/lib/types';
import { Button } from './ui/button';
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import Image from 'next/image';
import { ExternalLink, SquareArrowOutUpRight, ViewIcon } from 'lucide-react';

const DogDialog = ({ dog }: { dog: Dog }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='bg-blue-500 hover:bg-blue-600'>
					See More <SquareArrowOutUpRight />
				</Button>
			</DialogTrigger>

			<DialogContent className='w-full text-foreground'>
				<DialogHeader>
					<DialogTitle>{dog.name}</DialogTitle>
				</DialogHeader>
				<div className='p-4 flex gap-4 w-fit'>
					<Image
						src={dog.img}
						alt={dog.name}
						width={0}
						height={0}
						sizes='100vh'
						className='h-full w-full object-contain'
					/>
					<div className='text-nowrap space-y-4 w-fit'>
						<div className='w-fit'>
							<DialogDescription className='font-semibold'>Breed</DialogDescription>
							<DialogDescription>{dog.breed}</DialogDescription>
						</div>
						<div className='w-fit'>
							<DialogDescription className='font-semibold'>Age</DialogDescription>
							<DialogDescription>{dog.age} years old</DialogDescription>
						</div>
						<div className='w-fit'>
							<DialogDescription className='font-semibold'>Zip Code</DialogDescription>
							<DialogDescription>{dog.zip_code}</DialogDescription>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DogDialog;
