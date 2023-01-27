import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { omit } from 'lodash';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { registerAccount } from 'src/apis';
import { Input } from 'src/component/Input';
import { Schema, schema } from 'src/utils';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';

type Input = Schema;

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Input>({
    resolver: yupResolver(schema)
  });

  const { mutate } = useMutation({ mutationFn: (data: AuthVariables) => registerAccount(data) });

  const onSubmit = (data: Input) => {
    const payload = omit(data, ['confirm_password']);

    mutate(payload, {
      onSuccess: (data) => {
        console.log('data', data);
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<Schema, 'confirm_password'>>>(error)) {
          const formError = error?.response?.data?.data;

          if (formError) {
            Object.keys(formError).map((key) => {
              return setError(key as keyof Omit<Schema, 'confirm_password'>, {
                message: formError[key as keyof Omit<Schema, 'confirm_password'>],
                type: 'Server'
              });
            });
          }
        }
      }
    });
  };

  return (
    <div className='bg-primary10'>
      <div className='container'>
        <div className='grid grid-cols-1 py-10 md:py-14 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className='rounded bg-white p-10 shadow-sm'>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                errorMessage={errors?.email?.message}
              />
              <Input
                type='password'
                placeholder='Password'
                name='password'
                register={register}
                errorMessage={errors?.password?.message}
                autoComplete='on'
              />
              <Input
                type='password'
                placeholder='Confirm password'
                name='confirm_password'
                autoComplete='on'
                register={register}
                errorMessage={errors?.confirm_password?.message}
              />

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
