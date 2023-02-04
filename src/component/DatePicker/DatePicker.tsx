import range from 'lodash/range';
import { useEffect, useState } from 'react';
import { getFullYear } from 'src/utils';

type Props = {
  errorMessage?: string;
  onChange?: (value: Date) => void;
  value?: Date;
};
const DatePicker = ({ errorMessage, onChange, value }: Props) => {
  const [date, setDate] = useState<{ date: number; month: number; year: number }>({
    date: 1,
    month: 0,
    year: 1990
  });

  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate(),
        month: value?.getMonth(),
        year: value?.getFullYear()
      });
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = e.target;

    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: +valueFromSelect
    };

    setDate(newDate);

    onChange?.(new Date(newDate.year, newDate.month, newDate.date));
  };

  return (
    <div className='mt-2 flex flex-wrap'>
      <div className='w-[20%] truncate pt-4 text-right capitalize'>Ngày sinh</div>
      <div className='w-[80%] pl-5'>
        <div className='flex justify-between'>
          <select
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none hover:border-primary10'
            onChange={handleChange}
            name='date'
            value={value?.getDate() || date.date}
          >
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none hover:border-primary10'
            name='month'
            onChange={handleChange}
            value={value?.getMonth() || date.month}
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option value={item + 1} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none hover:border-primary10'
            name='year'
            onChange={handleChange}
            value={value?.getFullYear() || date.year}
          >
            <option disabled>Năm</option>
            {range(1990, 2024).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  );
};

export default DatePicker;
