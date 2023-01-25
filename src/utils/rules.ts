import type { FieldValues, RegisterOptions, UseFormGetValues } from 'react-hook-form';
import * as yup from 'yup';

export type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại password không khớp'
        : undefined
  }
});

const errorMessageLenght = 'Độ dài từ 5 - 160 ký tự';

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, errorMessageLenght)
    .max(160, errorMessageLenght),
  password: yup.string().required('Password là bắt buộc').min(6, errorMessageLenght).max(160, errorMessageLenght),
  confirm_password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, errorMessageLenght)
    .max(160, errorMessageLenght)
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
});

export const loginSchema = schema.omit(['confirm_password']);

export type LoginSchema = yup.InferType<typeof loginSchema>;
export type Schema = yup.InferType<typeof schema>;
