import { Button } from './ui/button';

const Match = () => {
	return (
		<div className='w-full h-full flex justify-center'>
			<Button
				variant={'outline'}
				size={'lg'}
				className='bg-green-500 hover:bg-green-300 text-background hover:text-background'
			>
				Generate Match
			</Button>
		</div>
	);
};

export default Match;
