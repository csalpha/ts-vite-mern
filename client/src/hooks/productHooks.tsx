// Importing necessary dependencies and modules
import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Product";

// Custom hook to fetch products data
export const useGetProductsQuery = () =>
  // The useQuery hook is used within the custom hook to handle the data fetching and caching.
  useQuery({
    // Unique query key to identify the query
    queryKey: ["products"],
    // Asynchronous query function to fetch the products
    queryFn: async () =>
      // Make an HTTP GET request to the api/products endpoint using the apiClient
      (await apiClient.get<Product[]>("api/products")).data,
  });

// Custom hook to fetch product details by slug
export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    // Unique query key to identify the query
    queryKey: ["products", slug],
    // Asynchronous query function to fetch the product details
    queryFn: async () =>
      // Make an HTTP GET request to the `api/products/slug/${slug}` endpoint using the apiClient
      (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
  });
