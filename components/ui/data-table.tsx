'use client';

import { FilterIcon } from 'lucide-react';
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from './table';
import { useEffect, useState } from 'react';
import { Skeleton } from './skeleton';
import { Input } from './input';
import { Button } from './button';

export interface Data extends Record<string, string | number | boolean> {
	id: string;
}

export type DataTableColumn = {
	id: string;
	displayName: string;
};

type DataTableProps<T extends Data> = {
	columns: DataTableColumn[];
	totalCount: number;
	rowBuilder?: (value: T, index: number, array: T[]) => React.ReactNode;
	fetchData: (skip: number, take: number, search?: string | null) => Promise<T[]>;
	batchSize?: number;
	paginate?: boolean;
	filter?: boolean;
	search?: boolean;
	addComponent?: () => React.ReactNode;
};
const DataTable = <T extends Data>({
	totalCount,
	columns,
	rowBuilder,
	fetchData,
	batchSize = 10,
	filter = true,
	search = true,
	addComponent = () => <></>,
}: DataTableProps<T>) => {
	const [data, setData] = useState<T[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [loadingData, setLoadingData] = useState<boolean>(true);
	const [searchQuery, setSearchQuery] = useState<string>();
	const [debouncedQuery, setDebouncedQuery] = useState<string>();

	const totalPageCount = Math.ceil(totalCount / batchSize);

	useEffect(() => {
		setLoadingData(true);

		const fetch = async () => {
			const newData = await fetchData(currentPage * batchSize, batchSize);
			setData(newData.slice(0, batchSize));
			setLoadingData(false);
		};

		fetch();
	}, [currentPage]);

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
		return () => clearTimeout(handler);
	}, [searchQuery]);

	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	useEffect(() => {
		setLoadingData(true);

		const fetch = async () => {
			const newData = await fetchData(currentPage * batchSize, batchSize, debouncedQuery);
			setData(newData.slice(0, batchSize));
			setLoadingData(false);
		};

		fetch();
	}, [debouncedQuery]);

	const DefaultRow = ({ value }: { value: T }) => (
		<TableRow key={value.id}>
			{columns.map((column) => (
				<TableCell key={column.id}>{value[column.id]}</TableCell>
			))}
		</TableRow>
	);

	// Row Component Wrapper to allow Hooks
	const RowComponent = ({ value, index, array }: { value: T; index: number; array: T[] }) => {
		return rowBuilder ? rowBuilder(value, index, array) : <DefaultRow value={value} />;
	};

	const AddComponent = () => {
		return addComponent();
	};

	return (
		<div className='p-4 border-[1px] border-muted rounded-lg h-fit overflow-auto space-y-4'>
			<div className='flex gap-2 w-full'>
				{search && <Input className='max-w-96' placeholder='Search' onChange={onSearchChange} />}
				{filter && (
					<Button variant={'outline'} size={'icon'}>
						<FilterIcon />
					</Button>
				)}
				<AddComponent />
			</div>

			<div className='border-[1px] rounded-sm p-2'>
				<Table className='text-nowrap overflow-hidden'>
					<TableHeader>
						<TableRow>
							{columns.map((column) => (
								<TableHead key={column.id}>
									<span>{column.displayName}</span>
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{loadingData
							? Array.from({ length: batchSize }).map((_, index) => (
									<TableRow key={`table_row_skeleton_${index}`}>
										{columns.map((_, index) => (
											<TableCell key={`table_cell_skeleton_${index}`} className='py-4 px-0'>
												<Skeleton className='bg-muted h-2 w-full rounded-md' />
											</TableCell>
										))}
									</TableRow>
							  ))
							: data.map((value, index, array) => (
									<RowComponent key={value.id} value={value} index={index} array={array} />
							  ))}
					</TableBody>
				</Table>
				<div className='w-full flex items-center justify-end'>
					{Array.from({ length: totalPageCount }).map((_, index) => (
						<Button
							key={`paginate_button_${index}`}
							variant={'outline'}
							className={`${currentPage !== index && 'border-background'} rounded-none w-8 h-8 text-lg`}
							onClick={() => setCurrentPage(index)}
						>
							{index + 1}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
};

export default DataTable;
