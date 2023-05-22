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
    queryFn: async () => (await apiClient.get<Product[]>("api/products")).data,
  });
