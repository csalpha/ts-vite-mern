// Importing necessary dependencies
import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { CartItem, ShippingAddress } from "../types/Cart";
import { Order } from "../types/Order";

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
