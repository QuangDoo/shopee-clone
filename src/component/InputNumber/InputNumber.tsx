import { forwardRef, InputHTMLAttributes } from 'react';

export type InputNumberProps = {
  containerClassName?: string;
  inputClassName?: string;
  classNameError?: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  props: InputNumberProps,
  ref
) {
  const {
    containerClassName = 'mt-3',
    errorMessage,
    inputClassName = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    onChange,
    ...rest
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(e);
    }
  };

  return (
    <div className={containerClassName}>
      <input {...rest} className={inputClassName} onChange={handleChange} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
});

export default InputNumber;
