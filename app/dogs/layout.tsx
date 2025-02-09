import GenerateMatch from "@/components/generate-match";
import LogOutButton from "@/components/logout-button";
import { Toaster } from "@/components/ui/toaster";

const DogSearchLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className="relative min-h-screen bg-gray-50">
			<div className="flex justify-center items-start pt-16">
				<div className="w-full max-w-7xl px-5 sm:px-8">{children}</div>
			</div>

			<div className="absolute top-5 left-5 z-20">
				<LogOutButton />
			</div>
			<Toaster />
		</div>
	);
};

export default DogSearchLayout;
