'use client';

import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DogSearchResponse, DogsSearchSort, getDogs, getDogsBreeds, getDogsSearch } from '@/lib/fetch-apis';
import { Dog } from '@/lib/types';
import { EditIcon, SquareArrowOutUpRight, Star } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { DialogDescription } from '@radix-ui/react-dialog';
import DogDialog from '@/components/dog-dialog';

type SortDirection = 'asc' | 'desc';
type SortBy = 'breed' | 'name' | 'age';

type BreedOption = {
	value: string;
	label: string;
};

const Home = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const ref = useRef<HTMLFormElement>(null);
	const [favorites, setFavorites] = useState<Dog[]>(() => {
		const saved = localStorage.getItem('favorites');
		return saved ? (JSON.parse(saved) as Dog[]) : [];
	});

	const addToFavorites = (dog: Dog) => {
		setFavorites((prev) => {
			const updated = prev.includes(dog) ? prev.filter((favId) => favId !== dog) : [...prev, dog];

			localStorage.setItem('favorites', JSON.stringify(updated));
			return updated;
		});
	};

	const clearFavorites = () => {
		localStorage.removeItem('favorites');
		setFavorites([]);
	};

	const sortDirectionParam = searchParams.get('sort-direction');
	const sortParam = searchParams.get('sort');
	const breedsparam = searchParams.getAll('breeds');
	const sizeParam = searchParams.get('size') || '10';
	const fromParam = searchParams.get('from') || '0';

	const [sortDirection, setSortDirection] = useState<SortDirection>(
		sortDirectionParam === 'asc' || sortDirectionParam === 'desc' ? sortDirectionParam : 'desc'
	);
	const [sortBy, setSort] = useState<SortBy>(
		['breed', 'name', 'age'].includes(sortParam!) ? (sortParam as SortBy) : 'breed'
	);
	const [breedOptions, setBreedOptions] = useState<BreedOption[]>([]);
	const [selectedBreeds, setSelectedBreeds] = useState<string[]>(breedsparam);
	const [size, setSize] = useState<number>(Number(sizeParam));
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [next, setNext] = useState<string>('');
	const [prev, setPrev] = useState<string>('');
	const [total, setTotal] = useState<number>(0);
	const [page, setPage] = useState<number>(1);

	const updateDirection = () => setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
	const updateSort = (value: SortBy) => setSort(value);
	const updateSelectedBreeds = (value: string[]) => setSelectedBreeds(value);
	const updateSize = (value: string) => setSize(Number(value));

	const reset = () => {
		setSort('breed');
		setSortDirection('desc');
		setSelectedBreeds([]);
		setSize(10);
		clearFavorites();
		router.push('/dogs/search');
	};

	const getDogBreedOptions = async () => {
		try {
			const response = await getDogsBreeds();
			if (response.ok) {
				const breeds = (await response.json()) as string[];
				setBreedOptions(breeds.map((breed) => ({ value: breed, label: breed })));
			}
		} catch (error) {
			setBreedOptions([]);
		}
	};

	useEffect(() => {
		try {
			getDogBreedOptions();
			getData();
		} catch (error) {
			router.push('/');
		}
	}, [sortBy, sortDirection, selectedBreeds, size, fromParam]);

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		const params = new URLSearchParams();
		params.set('sort', sortBy);
		params.set('sort-direction', sortDirection);
		params.set('size', size.toString());
		selectedBreeds.forEach((breed) => params.append('breeds', breed));
		router.push(`?${params.toString()}`);
	};

	const getData = async () => {
		const response = await getDogsSearch({
			size,
			sort: `${sortBy}:${sortDirection}` as DogsSearchSort,
			from: Number(fromParam),
			breeds: selectedBreeds,
		});

		if (response.ok) {
			const data = (await response.json()) as DogSearchResponse;
			setNext(data.next ?? '');
			setPrev(data.prev ?? '');
			setTotal(data.total);
			setPage(Math.ceil(Number(fromParam) / size) + 1);

			const result = await getDogs(data.resultIds);

			if (result.ok) {
				const dogs = (await result.json()) as Dog[];
				setDogs(dogs);
			}
		}
	};

	return (
		<div className='flex justify-center h-fit w-full overflow-auto pt-16 min-w-[500px]'>
			<form ref={ref} className='h-full max-w-[1200px] w-full p-4 text-nowrap space-y-4 ' onSubmit={handleSubmit}>
				<Card className='w-full p-6'>
					<CardContent className='space-y-6 w-full'>
						<div className='flex items-center justify-between gap-6 w-full'>
							<Label className='text-lg font-medium'>Sort By</Label>
							<Select value={sortBy} onValueChange={updateSort}>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Sort' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value='breed'>Breed</SelectItem>
										<SelectItem value='name'>Name</SelectItem>
										<SelectItem value='age'>Age</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>

							<Button
								type='button'
								onClick={updateDirection}
								className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-500/80'
							>
								{sortDirection === 'asc' ? 'Ascending' : 'Descending'}
							</Button>
						</div>

						<div className='space-y-4 w-full'>
							<MultiSelect
								options={breedOptions}
								onValueChange={updateSelectedBreeds}
								defaultValue={selectedBreeds}
								value={selectedBreeds}
								placeholder='Select Breeds'
								variant='default'
								animation={0}
								maxCount={5}
								className='w-full'
							/>
						</div>

						<div className='flex gap-4'>
							<Button
								type='submit'
								className='px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-500/80'
							>
								Search
							</Button>
							<Button
								type='button'
								onClick={reset}
								className='px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-300/80'
							>
								Reset
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className='w-full'>
					<CardHeader className='flex flex-row items-center justify-between p-4 bg-gray-100'>
						<CardTitle className='text-xl font-semibold'>Dogs</CardTitle>
						<Select value={String(size)} onValueChange={updateSize}>
							<SelectTrigger className='py-2 px-4 bg-blue-50 border border-blue-200 rounded-md w-fit'>
								{size}
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='10'>10</SelectItem>
								<SelectItem value='25'>25</SelectItem>
								<SelectItem value='50'>50</SelectItem>
								<SelectItem value='100'>100</SelectItem>
							</SelectContent>
						</Select>
					</CardHeader>

					<CardContent className='p-4 w-full'>
						<Table className='w-full'>
							<TableHeader>
								<TableRow>
									<TableHead>Breed</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Age</TableHead>
									<TableHead>Zip Code</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{dogs.length > 0 ? (
									dogs.map((dog) => (
										<TableRow key={dog.id}>
											<TableCell>{dog.breed}</TableCell>
											<TableCell>{dog.name}</TableCell>
											<TableCell>{dog.age}</TableCell>
											<TableCell>{dog.zip_code}</TableCell>
											<TableCell className='flex items-center gap-4'>
												<DogDialog dog={dog} />

												<Button
													type='button'
													size={'icon'}
													variant={'outline'}
													onClick={() => addToFavorites(dog)}
												>
													<Star
														stroke='black'
														size={24}
														fill={
															favorites.find((favorite) => favorite.id == dog.id)
																? 'yellow'
																: 'transparent'
														}
													/>
												</Button>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={5} className='text-center p-4 text-gray-500'>
											No dogs found.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</CardContent>

					<CardFooter className='p-4 bg-gray-100'>
						<Pagination className='flex items-center justify-center space-x-4'>
							<PaginationContent className='flex items-center'>
								{prev && (
									<PaginationItem>
										<PaginationPrevious href={prev} className='text-blue-500 hover:text-blue-700' />
									</PaginationItem>
								)}

								<PaginationItem>
									<PaginationLink href='#' className='text-lg font-semibold'>
										{page}
									</PaginationLink>
								</PaginationItem>

								{next && (
									<PaginationItem>
										<PaginationNext href={next} className='text-blue-500 hover:text-blue-700' />
									</PaginationItem>
								)}
							</PaginationContent>
						</Pagination>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
};

export default Home;
