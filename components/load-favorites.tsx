"use client";

import { useFavorites } from "@/context/favorites-context";
import { Button } from "./ui/button";

const LoadFavorites = () => {
	const { loadFavorites, favorites } = useFavorites();

	const handleClick = () => {
		loadFavorites();
	};

	return (
		<Button onClick={handleClick} className="bg-blue-500 text-2xl p-8">
			Load Favorites
		</Button>
	);
};

export default LoadFavorites;
