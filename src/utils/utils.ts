import axios, { AxiosError, HttpStatusCode } from 'axios';

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
};

export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
  return isAxiosError(error) && error?.response?.status === HttpStatusCode.UnprocessableEntity;
};
