"use client";

import { useFavorites } from "@/context/favorites-context";
import { Button } from "./ui/button";

const DeleteFavorites = () => {
	const { deleteFavorites, favorites } = useFavorites();

	const handleClick = () => {
		deleteFavorites();
	};

	return (
		<Button onClick={handleClick} disabled={favorites.length == 0} className="bg-red-500 text-2xl p-8">
			Delete Favorites
		</Button>
	);
};

export default DeleteFavorites;
