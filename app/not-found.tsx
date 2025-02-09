import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 text-center p-4">
      <PawPrint size={64} className="text-red-500 mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Oops! Lost in the Dog Park?
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Looks like this page ran away. Don't worry, we’ll get you back home.
      </p>
      <Link
        href="/dogs/search"
        className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
      >
        Return to Dog Park
      </Link>
    </div>
  );
}
