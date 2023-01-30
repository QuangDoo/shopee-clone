import { InputHTMLAttributes } from 'react';
import type { RegisterOptions, UseFormRegister } from 'react-hook-form';

type Props = {
  containerClassName?: string;
  inputClassName?: string;
  classNameError?: string;
  register?: UseFormRegister<any>;
  rules?: RegisterOptions;
  errorMessage?: string;
  autoComplete?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => {
  const {
    type,
    register,
    containerClassName = 'mt-3',
    placeholder,
    name,
    rules,
    errorMessage,
    inputClassName = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    autoComplete
  } = props;

  const registerResult = register && name ? register(name, rules) : {};

  return (
    <div className={containerClassName}>
      <input
        {...registerResult}
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
};

export default Input;
