import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import omit from 'lodash/omit';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from 'src/apis';
import { Button, Input } from 'src/component';
import { path } from 'src/constants';
import { AppContext } from 'src/contexts/app.context';
import { Schema, schema } from 'src/utils';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { Helmet } from 'react-helmet-async';

type Input = Pick<Schema, 'email' | 'password' | 'confirm_password'>;
const registerSchema = schema.pick(['email', 'password', 'confirm_password']);

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Input>({
    resolver: yupResolver(registerSchema)
  });

  const { setIsAuthenticated, setProfile } = useContext(AppContext);

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({ mutationFn: (data: AuthVariables) => authApi.registerAccount(data) });

  const onSubmit = (data: Input) => {
    const payload = omit(data, ['confirm_password']);

    mutate(payload, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data?.user);
        navigate(path.home);
      },
      onError: (error) => {
        // handle error 422
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<Schema, 'confirm_password'>>>(error)) {
          const formError = error?.response?.data?.data;

          if (formError) {
            Object.keys(formError).map((key) => {
              return setError(key as keyof Omit<Input, 'confirm_password'>, {
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
      <Helmet>
        <title>Đăng ký | Shopee Clone</title>
        <meta name='description' content='Đăng ký | Shopee Clone' />
      </Helmet>
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
                containerClassName='relative'
              />
              <Input
                type='password'
                placeholder='Confirm password'
                name='confirm_password'
                autoComplete='on'
                containerClassName='relative'
                register={register}
                errorMessage={errors?.confirm_password?.message}
              />

              <div className='mt-3'>
                <Button isLoading={isLoading} disabled={isLoading}>
                  Đăng ký
                </Button>
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
