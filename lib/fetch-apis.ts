"use client";

import { getDogsSearchProps } from "./types";

const BASE = "https://frontend-take-home-service.fetch.com";

export const login = (name: string, email: string) => {
  return fetch(`${BASE}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  });
};

export const logout = () => {
  return fetch(`${BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const getDogsBreeds = () => {
  try {
    return fetch(`${BASE}/dogs/breeds`, {
      credentials: "include",
    });
  } catch (error) {
    throw error;
  }
};

export const getDogsSearch = (searchParams: getDogsSearchProps) => {
  try {
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

    return fetch(url, { credentials: "include" });
  } catch (error) {
    throw error;
  }
};

export const getDogs = (resultIds: string[]) => {
  return fetch(`${BASE}/dogs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resultIds),
  });
};

export const getMatch = (resultIds: string[]) => {
  return fetch(`${BASE}/dogs/match`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resultIds),
  });
};
