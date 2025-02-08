const BASE = 'https://frontend-take-home-service.fetch.com';

export const login = (name: string, email: string) => {
	return fetch(`${BASE}/auth/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: name,
			email: email,
		}),
	});
};

export const logout = () => {
	return fetch(`${BASE}/auth/logout`, {
		method: 'POST',
		credentials: 'include',
	});
};

export const getDogsBreeds = () => {
	return fetch(`${BASE}/dogs/breeds`, {
		credentials: 'include',
	});
};

export type getDogsSearchProps = {
	breeds?: string[];
	zipCodes?: string[];
	ageMin?: number;
	ageMax?: number;
	size?: number;
	from?: number;
	sort?: DogsSearchSort;
};

export type DogsSearchSort = 'breeds:asc' | 'breeds:desc' | 'name:asc' | 'name:desc' | 'age:asc' | 'age:desc';

export type DogSearchResponse = {
	next?: string;
	prev?: string;
	resultIds: string[];
	total: number;
};

export const getDogsSearch = (searchParams: getDogsSearchProps) => {
	const url = new URL(`${BASE}/dogs/search`);

	Object.keys(searchParams).forEach((key) => {
		const value = searchParams[key as keyof getDogsSearchProps];

		if (Array.isArray(value)) {
			value.forEach((item) => {
				url.searchParams.append(key, item);
			});
		} else if (value !== undefined) {
			url.searchParams.append(key, value.toString());
		}
	});

	return fetch(url.toString(), { credentials: 'include' });
};

export const getDogs = (resultIds: string[]) => {
	return fetch(`${BASE}/dogs`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(resultIds),
	});
};
