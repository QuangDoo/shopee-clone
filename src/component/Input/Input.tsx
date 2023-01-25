import type { RegisterOptions, UseFormRegister } from 'react-hook-form';

type Props = {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  errorMessage?: string;
  autoComplete?: string;
};

const Input = (props: Props) => {
  const {
    type,
    register,
    containerClassName = 'mt-3',
    placeholder,
    name,
    rules,
    errorMessage,
    inputClassName,
    autoComplete
  } = props;

  return (
    <div className={containerClassName}>
      <input
        {...register(name, rules)}
        type={type}
        className={`w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm ${inputClassName}`}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  );
};

export default Input;
