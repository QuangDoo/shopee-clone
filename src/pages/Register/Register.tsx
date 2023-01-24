import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { rules } from 'src/utils';

type Input = {
  email: string;
  password: string;
  confirm_password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Input>();

  const onSubmit = (data: Input) => {
    console.log('data', data.email);
  };

  return (
    <div className='bg-primary10'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-10 md:py-14 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className='rounded bg-white p-10 shadow-sm'>
              <div className='text-2xl'>Đăng ký</div>
              <div className='mt-3'>
                <input
                  {...register('email', rules.email)}
                  type='email'
                  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.email?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  {...register('password', rules.password)}
                  type='password'
                  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errors.password?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  {...register('confirm_password', rules.confirm_password)}
                  type='password'
                  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Confirm Password'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errors.confirm_password?.message}</div>
              </div>
              <div className='mt-3'>
                <button className='rouned w-full rounded-sm bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>

              <div className='mt-6 flex content-center items-center justify-center'>
                <div className='mr-2 text-gray-400'>Bạn đã biết đến Shopee fake?</div>
                <div className='text-primary10 underline-offset-2 opacity-75'>
                  <Link to='/login'>Đăng nhập</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
