"use client";

import { useFavorites } from "@/context/favorites-context";
import { Button } from "./ui/button";

const SaveFavorites = () => {
	const { saveFavorites, favorites } = useFavorites();

	const handleClick = () => {
		saveFavorites();
	};

	return (
		<Button onClick={handleClick} disabled={favorites.length == 0} className="bg-green-600 text-2xl p-8">
			Save Favorites
		</Button>
	);
};

export default SaveFavorites;
