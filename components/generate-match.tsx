import Favorites from './favorites';
import Match from './match';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';

const GenerateMatch = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>Find A Match</Button>
			</SheetTrigger>
			<SheetContent side={'bottom'} className='h-screen space-y-4'>
				<SheetTitle className='text-2xl'>Generate Match</SheetTitle>
				<ScrollArea>
					<div className='h-fit w-full space-y-4'>
						<Favorites />
						<Match />
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};

export default GenerateMatch;
