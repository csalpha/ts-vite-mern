// Define a custom type for ApiError
export declare type ApiError = {
  message: string; // The error message describing the error that occurred
  // The response object containing the error data
  response: {
    // The data object within the response that holds the error message
    data: {
      message: string; // The error message received from the API
    };
  };
};
