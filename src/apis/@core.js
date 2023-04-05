import ApiCustomError from "./@error";

export const ErrorHandle = (error) => {
    const err = new ApiCustomError(error.response.data.error, error.response.status);
    if (!error) {
      throw new Error(error);
    }
    return err.message;
};