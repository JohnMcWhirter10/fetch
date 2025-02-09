import { LoginForm } from "@/components/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
	return (
		<div className="min-h-svh w-full p-6 md:p-10 flex flex-col items-center justify-center">
			<div className="w-full border-y-2 py-4 mb-6 text-center">
				<h1 className="text-4xl font-semibold text-indigo-600">Welcome to the Dog Matching Algorithm!</h1>
				<p className="text-lg text-gray-700 mt-2">Log in to find your perfect puppy companion! 🐾</p>
			</div>
			<Card className="w-fit p-6 shadow-lg rounded-lg">
				<CardHeader>
					<CardTitle className="text-2xl text-center text-indigo-600">Log In</CardTitle>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}
