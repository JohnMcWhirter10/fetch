"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Dog } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface FavoritesContextType {
	favorites: Dog[];
	addOrRemoveFavorite: (dog: Dog) => void;
	clearFavorites: () => void;
	saveFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
	const { toast } = useToast();

	const [favorites, setFavorites] = useState<Dog[]>(() => {
		const saved = localStorage.getItem("favorites");
		return saved ? (JSON.parse(saved) as Dog[]) : [];
	});

	const addOrRemoveFavorite = (dog: Dog) => {
		setFavorites((prev) => {
			const updated = prev.includes(dog) ? prev.filter((favorite) => favorite.id !== dog.id) : [...prev, dog];
			return updated;
		});
		if (favorites.includes(dog)) {
			toast({
				title: `Removed ${dog.name} from Favorites`,
				variant: "destructive",
			});
		} else {
			toast({
				title: `Added ${dog.name} to Favorites`,
				variant: "success",
			});
		}
	};

	const clearFavorites = () => {
		setFavorites([]);
	};

	const saveFavorites = () => {
		if (favorites.length == 0) {
			toast({
				title: "No Favorites.",
				variant: "destructive",
			});
		} else {
			localStorage.setItem("favorites", JSON.stringify(favorites));
			toast({
				title: "Saved",
				description: "Favorites Saved to Local Storage",
				variant: "success",
			});
		}
	};

	return (
		<FavoritesContext.Provider value={{ favorites, addOrRemoveFavorite, clearFavorites, saveFavorites }}>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error("useFavorites must be used within a FavoritesProvider");
	}
	return context;
};
