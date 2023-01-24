import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type Input = {
  email: string;
  password: string;
};

const Login = () => {
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
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmit(onSubmit)}>
              <div className='text-2xl'>Đăng nhập</div>
              <div className='mt-3'>
                <input
                  {...register('email')}
                  type='email'
                  name='email'
                  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'></div>
              </div>
              <div className='mt-3'>
                <input
                  {...register('password')}
                  type='password'
                  name='password'
                  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'></div>
              </div>
              <div className='mt-3'>
                <button
                  type='submit'
                  className='rouned w-full rounded-sm bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='mt-6 flex content-center items-center justify-center'>
                <div className='mr-2 text-gray-400'>Bạn mới biết đến Shopee fake?</div>
                <div className='text-primary10 underline-offset-2 opacity-75'>
                  <Link to='/register'>Đăng ký</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
