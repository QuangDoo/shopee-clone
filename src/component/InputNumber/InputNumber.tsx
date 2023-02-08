/* eslint-disable react/display-name */
import { forwardRef, InputHTMLAttributes, useState } from 'react';

export type InputNumberProps = {
  containerClassName?: string;
  inputClassName?: string;
  classNameError?: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>((props: InputNumberProps, ref) => {
  const {
    containerClassName = 'mt-3',
    errorMessage,
    inputClassName = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    onChange,
    value,
    ...rest
  } = props;

  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d+$/.test(value) || value === '') {
      // thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(e);

      // cập nhật local value state
      setLocalValue(value);
    }
  };

  return (
    <div className={containerClassName}>
      <input
        {...rest}
        className={inputClassName}
        value={value === undefined ? localValue : value}
        onChange={handleChange}
        ref={ref}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
});

export default InputNumber;
