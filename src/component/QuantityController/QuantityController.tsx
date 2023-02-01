import { useState } from 'react';
import { Button } from '../Button';
import { InputNumber } from '../InputNumber';
import { InputNumberProps } from '../InputNumber/InputNumber';

type Props = {
  max?: number;
  onIncrease?: (value: number) => void;
  onDecrease?: (value: number) => void;
  onTyping?: (value: number) => void;
  classNameWrapper?: string;
} & InputNumberProps;

const QuantityController = (props: Props) => {
  const { max, onIncrease, onDecrease, onTyping, classNameWrapper = 'ml-10', value, ...rest } = props;

  const [localValue, setLocalValue] = useState<number>(Number(value) || 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value);
    if (max && _value > max) {
      _value = max;
    } else if (_value <= 0) {
      _value = 1;
    }

    onTyping?.(_value);
    setLocalValue(_value);
  };

  const handeIncrease = () => {
    let _value = localValue + 1;

    if (max && _value > max) {
      _value = max;
    }

    onIncrease?.(_value);
    setLocalValue(_value);
  };

  const handeDecrease = () => {
    let _value = localValue - 1;

    if (_value <= 0) {
      _value = 1;
    }

    onDecrease?.(_value);
    setLocalValue(_value);
  };

  return (
    <div className={'flex items-center text-gray-600' + classNameWrapper}>
      <Button className='border border-r-0 border-gray-400 py-2 px-3' onClick={handeDecrease}>
        -
      </Button>
      <InputNumber
        classNameError='hidden'
        value={value || localValue}
        inputClassName='h-8 w-14 border border-gray-400 py-[1.1rem] outline-none text-center'
        containerClassName='mt-0'
        onChange={handleChange}
        {...rest}
      />
      <Button className='border border-l-0 border-gray-400 py-2 px-3' onClick={handeIncrease}>
        +
      </Button>
    </div>
  );
};

export default QuantityController;
