import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { UserInfo } from "../types/UserInfo";

// sets up a mutation function for signing in a user by sending their email and password to a server API endpoint.
// The response from the server, containing the user information, is then extracted and returned.
export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      // Makes an asynchronous POST request to the server's 'signin' API endpoint with the provided email and password.
      (
        await apiClient.post<UserInfo>(`api/users/signin`, {
          email,
          password,
        })
      ).data, // It expects a response of type 'UserInfo' and returns the 'data' property from the response.
  });
