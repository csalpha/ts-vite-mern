// Importing necessary dependencies
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { CartItem, ShippingAddress } from "../types/Cart";
import { Order } from "../types/Order";

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ["orders", id],
    queryFn: async () => (await apiClient.get<Order>(`api/orders/${id}`)).data,
  });

// Custom hook: useGetPaypalClientIdQuery
// Description: Performs a query to retrieve the PayPal client ID from the server
export const useGetPaypalClientIdQuery = () =>
  useQuery({
    queryKey: ["paypal-clientId"],
    queryFn: async () =>
      (await apiClient.get<{ clientId: string }>(`/api/keys/paypal`)).data,
  });

// Custom hook: usePayOrderMutation
// Description: Performs a mutation to mark an order as paid on the server
export const usePayOrderMutation = () =>
  useMutation({
    // Defining the mutation function
    mutationFn: async (details: { orderId: string }) =>
      // Sending a PUT request to upadate the order using the apiClient
      (
        await apiClient.put<{ message: string; order: Order }>(
          `api/orders/${details.orderId}/pay`,
          details
        )
      ).data,
  });

// Creating a custom mutation hook called useCreateOrderMutation
export const useCreateOrderMutation = () =>
  useMutation({
    // Defining the mutation function
    mutationFn: async (order: {
      orderItems: CartItem[];
      shippingAddress: ShippingAddress;
      paymentMethod: string;
      itemsPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
    }) =>
      // Sending a POST request to create a new order using the apiClient
      (
        await apiClient.post<{ message: string; order: Order }>(
          `api/orders`,
          order
        )
      ).data,
  });

// Creating a custom query hook called useGetOrderHistoryQuery
  export const useGetOrderHistoryQuery = () =>

  useQuery({
    queryKey: ['order-history'], // Setting the query key
    // Defining the query function
    queryFn: async () =>
      // Sending a GET request to retrieve the order history from the server using the apiClient
      (await apiClient.get<Order[]>(`/api/orders/mine`)).data,
  })
