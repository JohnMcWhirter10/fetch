"use client";

import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Card, CardContent, CardTitle } from "./ui/card";
import DogDialog from "./dog-dialog";
import { useFavorites } from "@/context/favorites-context";

const Favorites = () => {
	const { favorites, addOrRemoveFavorite } = useFavorites();

	return (
		<Card className="w-full p-6 space-y-4 text-nowrap">
			<CardTitle>Your Favorites</CardTitle>
			<CardContent>
				<Table className="w-full border border-gray-200 shadow-sm rounded-md">
					<TableBody>
						{favorites.length > 0 ? (
							favorites.map((dog) => (
								<TableRow key={dog.id} className="hover:bg-gray-50 transition">
									<TableCell className="text-right text-2xl">{dog.name}</TableCell>
									<TableCell className="flex items-center justify-center">
										<DogDialog dog={dog} />
									</TableCell>
									<TableCell>
										<Button
											variant="destructive"
											onClick={() => addOrRemoveFavorite(dog)}
											className="flex items-center gap-1 px-3 py-1"
										>
											<X />
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} className="text-center p-6 text-gray-500">
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
