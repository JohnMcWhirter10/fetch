import { Dog } from "@/lib/types";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import Image from "next/image";
import { SquareArrowOutUpRight, Star } from "lucide-react";
import { useFavorites } from "@/context/favorites-context";

const DogDialog = ({ dog }: { dog: Dog }) => {
	const { favorites, addOrRemoveFavorite } = useFavorites();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2">
					See More <SquareArrowOutUpRight />
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-[800px] text-nowrap w-full text-foreground p-6 rounded-lg shadow-xl transition-transform duration-200 ease-in-out transform">
				<DialogTitle className="hidden">{dog.name}</DialogTitle>

				<div className="p-4 flex gap-8 items-center">
					<div className="relative overflow-hidden shadow-lg border-indigo-600 border-2 rounded-md">
						<Image
							src={dog.img}
							alt={dog.name}
							width={0}
							height={0}
							sizes="100vw"
							className="object-contain w-full h-full"
						/>
					</div>

					<div className="grid grid-cols-2 gap-8">
						<>
							<DialogDescription className="text-4xl font-semibold text-center text-indigo-600">
								{dog.name}
							</DialogDescription>
							<Button
								type="button"
								variant={"outline"}
								size={"icon"}
								onClick={() => addOrRemoveFavorite(dog)}
							>
								<Star
									stroke="black"
									fill={
										favorites.find((favorite) => favorite.id === dog.id) ? "yellow" : "transparent"
									}
								/>
							</Button>
						</>
						<DialogDescription className="text-xl font-semibold text-indigo-600 text-right">
							Breed:
						</DialogDescription>
						<DialogDescription className="text-xl">{dog.breed}</DialogDescription>
						<DialogDescription className="text-xl font-semibold text-indigo-600 text-right">
							Age:
						</DialogDescription>
						<DialogDescription className="text-xl">{dog.age} years old</DialogDescription>
						<DialogDescription className="text-xl font-semibold text-indigo-600 text-right">
							Zip Code:
						</DialogDescription>
						<DialogDescription className="text-xl">{dog.zip_code}</DialogDescription>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DogDialog;
