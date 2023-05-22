import { ApiError } from "./types/ApiError";

// It is designed to extract and return the error message from the error object.

export const getError = (error: ApiError) => {
  // If both conditions are met,
  return error.response && error.response.data.message
    ? error.response.data.message // returns the value of error.response.data.message
    : // otherwise,
      error.message; //the function returns the value of error.message
};
// This allows you to access a specific error message from the API response.
