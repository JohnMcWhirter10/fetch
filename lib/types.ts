export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface MatchType {
  match: string;
}

export type getDogsSearchProps = {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: DogsSearchSort;
};

export type DogsSearchSort =
  | "breeds:asc"
  | "breeds:desc"
  | "name:asc"
  | "name:desc"
  | "age:asc"
  | "age:desc";

export type DogSearchResponse = {
  next?: string;
  prev?: string;
  resultIds: string[];
  total: number;
};

export type SortDirection = "asc" | "desc";
export type SortBy = "breed" | "name" | "age";

export type BreedOption = {
  value: string;
  label: string;
};
