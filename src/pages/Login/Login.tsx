import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginAccount } from 'src/apis';
import { Button, Input } from 'src/component';
import { path } from 'src/constants';
import { AppContext } from 'src/contexts/app.context';
import { loginSchema, Schema } from 'src/utils';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';

type Input = Omit<Schema, 'confirm_password'>;

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Input>({
    resolver: yupResolver(loginSchema)
  });

  const { setIsAuthenticated, setProfile } = useContext(AppContext);

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: Input) => loginAccount(payload)
  });

  const onSubmit = (payload: Input) => {
    mutate(payload, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data?.user);
        navigate(path.home);
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Input>>(error)) {
          const formError = error?.response?.data?.data;

          if (formError) {
            Object.keys(formError).map((key) => {
              return setError(key as keyof Input, {
                message: formError[key as keyof Input],
                type: 'Server'
              });
            });
          }
        }

        console.log('error', error);
      }
    });
  };

  return (
    <div className='bg-primary10'>
      <div className='container'>
        <div className='grid grid-cols-1 py-10 md:py-14 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmit(onSubmit)}>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                type='email'
                name='email'
                placeholder='Email'
                errorMessage={errors?.email?.message}
                register={register}
              />
              <Input
                type='password'
                name='password'
                placeholder='Passwrod'
                errorMessage={errors?.password?.message}
                register={register}
              />

              <div className='mt-3'>
                <Button isLoading={isLoading} disabled={isLoading} type='submit'>
                  Đăng nhập
                </Button>
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
