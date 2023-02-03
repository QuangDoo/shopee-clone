import axios, { AxiosError, HttpStatusCode } from 'axios';
import { config } from 'src/constants';
import userIcon from 'src/assets/icons/user.svg';

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
};

export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
  return isAxiosError(error) && error?.response?.status === HttpStatusCode.UnprocessableEntity;
};
export const formatCurrency = (currency: number) => {
  return '₫' + new Intl.NumberFormat('de-DE').format(currency);
};

export const formatNumberToSocialStyle = (value: number) => {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
    .format(value)
    .replace('.', ',')
    .toLowerCase();
};

export const calculateDiscountPercent = (original: number, price_discount: number) => {
  return Math.round(100 - (price_discount / original) * 100) + '%';
};

export const removeCharacter = (value: string) =>
  // eslint-disable-next-line no-useless-escape
  value.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '');

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeCharacter(name).replace(/\s/g, '-') + `-i,${id}`;
};

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i,');
  return arr[arr.length - 1];
};

export const getFullYear = (date?: Date) => {
  return date?.getFullYear();
};

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${config.baseUrl}images/${avatarName}` : userIcon);
