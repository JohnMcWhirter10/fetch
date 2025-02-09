"use client";

import Link from "next/link";
import { PawPrint, AlertTriangle } from "lucide-react";

export default function Error() {
	return (
		<div className="h-screen flex flex-col justify-center items-center bg-red-50 text-center p-4">
			<AlertTriangle size={64} className="text-red-600 mb-4 animate-pulse" />
			<h1 className="text-4xl font-bold text-gray-800 mb-2">Uh-oh! Something Went Ruff.</h1>
			<p className="text-lg text-gray-700 mb-4">
				We hit a snag fetching this page. Maybe it's hiding under the couch?
			</p>
			<PawPrint size={48} className="text-blue-400 mb-4 animate-bounce" />
			<Link
				href="/dogs/search"
				className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
			>
				Sniff Your Way Back Home
			</Link>
		</div>
	);
}
