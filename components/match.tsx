"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { getDogs, getMatch } from "@/lib/fetch-apis";
import { Dog, MatchType } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { useEffect } from "react";
import { useFavorites } from "@/context/favorites-context";

const Match = () => {
	const [error, setError] = useState<string>();
	const [pending, setPending] = useState<boolean>(false);
	const [match, setMatch] = useState<Dog>();

	const { favorites } = useFavorites();

	const generateMatch = async () => {
		setPending(true);
		setError("");
		const saved = localStorage.getItem("favorites");
		if (saved) {
			try {
				const matchResponse = await getMatch((JSON.parse(saved) as Dog[]).map((dog) => dog.id));
				if (!matchResponse.ok) {
					setError("Could not generate match right now. Try Again.");
					return;
				}
				const data = (await matchResponse.json()) as MatchType;
				const dogsResponse = await getDogs([data.match]);
				if (!dogsResponse.ok) {
					setError("Could not generate match right now. Try Again.");
					return;
				}
				const dogs = (await dogsResponse.json()) as Dog[];
				setMatch(dogs[0]);
			} catch (err) {
				setError("An unexpected error occurred. Please try again later.");
			}
		} else {
			setError("No Favorites");
		}
		setPending(false);
	};

	return (
		<div className="w-full h-full flex flex-col justify-center">
			<Button
				variant={"outline"}
				onClick={generateMatch}
				disabled={pending || favorites.length == 0}
				size={"lg"}
				className="bg-green-500 hover:bg-green-300 text-background hover:text-background"
			>
				{pending ? "Loading... " : "Generate Match"}
			</Button>
			{error && <div className="text-red-500 mt-4">{error}</div>}
			{match && (
				<Card className="mt-8 p-6 bg-yellow-100 border-4 border-yellow-500 shadow-lg rounded-lg animate-in">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl font-bold text-pink-600">
							🎉 We've matched you with the cutest little puppy... 🎉
						</CardTitle>
					</CardHeader>
					<CardContent className="text-center">
						<CardDescription className="font-semibold text-2xl">{match.name}</CardDescription>

						<div className="p-4 flex justify-center gap-8">
							<Image
								src={match.img}
								alt={match.name}
								width={200}
								height={200}
								className="border-4 shadow-xl transform transition duration-500 ease-in-out hover:scale-110"
							/>
						</div>
						<div className="mt-4 text-xl font-semibold ">
							<CardDescription className="text-xl font-light text-gray-700">
								{match.breed} – {match.age} years old
							</CardDescription>
							<CardDescription className="text-lg text-gray-500">{match.zip_code}</CardDescription>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default Match;
