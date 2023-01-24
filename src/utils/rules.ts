import type { RegisterOptions } from 'react-hook-form';

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions;
};

export const rules: Rules = {
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
      message: 'Độ dài từ 5-160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5-160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Mật khẩu là bắt buộc'
    },
    maxLength: {
      value: 12,
      message: 'Độ dài mật khẩu từ 5-12 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài mật khẩu từ 5-12 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Mật khẩu là bắt buộc'
    },
    maxLength: {
      value: 12,
      message: 'Độ dài mật khẩu từ 5-12 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài mật khẩu từ 5-12 ký tự'
    }
  }
};
