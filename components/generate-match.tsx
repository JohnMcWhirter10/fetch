"use client";

import { useFavorites } from "@/context/favorites-context";
import Favorites from "./favorites";
import Match from "./match";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const GenerateMatch = () => {
	const { favorites } = useFavorites();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button disabled={favorites.length == 0} className="bg-indigo-500 text-2xl p-8">
					Find A Match
				</Button>
			</SheetTrigger>
			<SheetContent side={"bottom"} className="h-screen space-y-4">
				<SheetTitle className="text-2xl">Generate Match</SheetTitle>
				<ScrollArea>
					<div className="h-fit w-full space-y-4">
						<Favorites />
						<Match />
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};

export default GenerateMatch;
