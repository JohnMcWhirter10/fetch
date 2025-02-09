import DeleteFavorites from "@/components/delete-favorites";
import DogsTable from "@/components/dogs-table";
import GenerateMatch from "@/components/generate-match";
import LoadFavorites from "@/components/load-favorites";
import SaveFavorites from "@/components/save-favorites";
import { FavoritesProvider } from "@/context/favorites-context";
import { Suspense } from "react";

const Home = () => {
	return (
		<div className="flex flex-col justify-center h-fit w-full overflow-auto pt-16 min-w-[500px]">
			<FavoritesProvider>
				<div className="w-full flex justify-between">
					<SaveFavorites />
					<LoadFavorites />
					<DeleteFavorites />
					<GenerateMatch />
				</div>
				<Suspense fallback={<div>Loading...</div>}>
					<DogsTable />
				</Suspense>
			</FavoritesProvider>
		</div>
	);
};

export default Home;
