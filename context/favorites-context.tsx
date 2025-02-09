"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Dog } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface FavoritesContextType {
	favorites: Dog[];
	addOrRemoveFavorite: (dog: Dog) => void;
	clearFavorites: () => void;
	saveFavorites: () => void;
	loadFavorites: () => void;
	deleteFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
	const { toast } = useToast();

	const [favorites, setFavorites] = useState<Dog[]>([]);

	useEffect(() => {
		setFavorites(JSON.parse(localStorage.getItem("favorites") ?? "[]") as Dog[]);
	}, []);

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

	const loadFavorites = () => {
		if (favorites.length != 0) {
			toast({
				title: "Favorites Already Loaded",
				variant: "destructive",
				description: "Clear Favorites and try again.",
			});
		} else {
			const loadedFavorites = JSON.parse(localStorage.getItem("favorites") ?? "[]") as Dog[];
			if (loadedFavorites.length > 0) {
				setFavorites(loadedFavorites);
				toast({
					title: "Successfully Loaded Favorites",
					variant: "success",
				});
			} else {
				toast({
					title: "No Favorites Saved",
					variant: "destructive",
				});
			}
		}
	};

	const deleteFavorites = () => {
		if (localStorage.getItem("favorites")) {
			localStorage.removeItem("favorites");
			toast({
				title: "Deleted Favorites",
				variant: "success",
			});
		} else {
			toast({
				title: "No Favorites.",
				variant: "destructive",
			});
		}
	};

	return (
		<FavoritesContext.Provider
			value={{ favorites, addOrRemoveFavorite, clearFavorites, saveFavorites, loadFavorites, deleteFavorites }}
		>
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
