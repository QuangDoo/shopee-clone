import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { userApi } from 'src/apis/user.api';
import { Button, DatePicker, Input, InputNumber } from 'src/component';
import { config } from 'src/constants';
import { AppContext } from 'src/contexts/app.context';
import { getAvatarUrl, isAxiosUnprocessableEntityError, setProfileToLS, userSchema, UserSchema } from 'src/utils';
import { Helmet } from 'react-helmet-async';

type FormData = Pick<UserSchema, 'avatar' | 'name' | 'address' | 'phone' | 'date_of_birth'>;
type FormErrorData = Omit<FormData, 'date_of_birth'> & { date_of_birth?: string };

const validateUserSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar']);

const User = () => {
  const fileInutRef = useRef<HTMLInputElement | null>(null);
  const { setProfile } = useContext(AppContext);

  const [file, setFile] = useState<File>();

  const previewImage = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);

  // useForm only excute once as component mount at first time
  // default value can not set data from serve such as: defaultValues: { address: data || ''}
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    setError
  } = useForm<FormData>({
    defaultValues: { address: '', avatar: '', date_of_birth: new Date(1990, 0, 1), name: '', phone: '' },
    resolver: yupResolver(validateUserSchema)
  });

  const { data: userData, refetch: refetchUser } = useQuery({
    queryKey: ['user'],
    queryFn: userApi.getProfile
  });

  const { mutateAsync: updateProfileMutate } = useMutation({
    mutationFn: userApi.updateProfile
  });

  const { mutateAsync: uploadAvatarMutate } = useMutation(userApi.uploadAvatar);

  const user = userData?.data.data;

  useEffect(() => {
    if (user) {
      setValue('address', user.address);
      setValue('avatar', user.avatar);
      setValue('date_of_birth', user.date_of_birth ? new Date(user.date_of_birth) : new Date(1990, 0, 1));
      setValue('name', user.name);
      setValue('phone', user.phone);
    }
  }, [user, setValue]);

  const handleOnUpdate = handleSubmit(async (data) => {
    let avatarName = '';
    try {
      const form = new FormData();
      if (file) {
        form.append('image', file);
        const uploadResponse = await uploadAvatarMutate(form);
        avatarName = uploadResponse?.data?.data || '';
      }

      const response = await updateProfileMutate({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      });

      refetchUser();
      toast.success(response.data.message);
      setProfile(response.data.data);
      setProfileToLS(response.data.data as User);
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ResponseApi<FormErrorData>>(error)) {
        const formError = error?.response?.data?.data;

        if (formError) {
          Object.keys(formError).map((key) => {
            return setError(key as keyof FormErrorData, {
              message: formError[key as keyof FormErrorData],
              type: 'Server'
            });
          });
        }
      }
    }
  });

  const handleAccessFileInputRef = () => {
    fileInutRef.current?.click();
  };

  const handleOnFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target?.files?.[0];

    if (fileFromLocal && (fileFromLocal?.size >= config.sizeImageUpload || !fileFromLocal.type.startsWith('image'))) {
      return toast.warning('Dung l?????ng file t???i ??a 1 MB ?????nh d???ng: .JPEG, .JPG, .PNG');
    }
    setFile(fileFromLocal);
  };

  const avatar = watch('avatar');

  return (
    <div className='rounded-md bg-white px-2 py-3 md:px-4'>
      <Helmet>
        <title>Profile | Shopee Clone</title>
        <meta name='description' content='Profile | Shopee Clone' />
      </Helmet>
      <div className='text-lg font-medium text-black'>H??? s?? c???a t??i</div>
      <div className='text-md text-gray-600'>Qu???n l?? th??ng tin h??? s?? ????? b???o m???t t??i kho???n</div>
      <div className='my-5 h-[0.5px] w-full bg-gray-300'></div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={handleOnUpdate}>
        <div className='mt-6 flex-grow pr-0 md:mt-0 md:pr-10 lg:pr-12'>
          <div className='flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>{user?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-4 text-right capitalize'>T??n</div>
            <div className='w-[80%] pl-5'>
              <Input
                inputClassName='w-full rounded-sm border border-gray-300 px-1 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='name'
                errorMessage={errors?.name?.message}
                register={register}
                placeholder='T??n'
              />
            </div>
          </div>
          <div className='mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-1 text-right capitalize'>S??? ??i???n tho???i</div>
            <div className='w-[80%] pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <InputNumber
                    placeholder='S??? ??i???n tho???i'
                    containerClassName='grow'
                    inputClassName='w-full rounded-sm border border-gray-300 px-1 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                    onChange={(event) => {
                      onChange(event);
                    }}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    errorMessage={errors.phone?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-4 text-right capitalize'>?????a ch???</div>
            <div className='w-[80%] pl-5'>
              <Input
                inputClassName='w-full rounded-sm border border-gray-300 px-1 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='address'
                errorMessage={errors?.address?.message}
                register={register}
                placeholder='?????a ch???'
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field: { onChange, value } }) => (
              <DatePicker onChange={onChange} value={value} errorMessage={errors.date_of_birth?.message} />
            )}
          />

          <div className='mt-4 flex flex-wrap'>
            <div className='w-[20%] truncate pt-4 capitalize sm:text-right'></div>
            <div className='w-[80%] pl-5'>
              <Button className='flex h-9 items-center bg-primary10 px-5 text-center text-sm text-white hover:bg-primary10/80'>
                L??u
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:border-l md:border-l-gray-200 md:px-10 '>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24'>
              <img
                src={previewImage || getAvatarUrl(avatar)}
                alt='https://cf.shopee.vn/file/ef2f6d59be398920fc2f5b252aa8f7d9_tn'
                className='h-full w-full rounded-full object-cover '
              />
            </div>
            <input
              type='file'
              accept='.jpg,.jpeg,.png'
              className='hidden'
              ref={fileInutRef}
              onChange={handleOnFileChange}
            />
            <button
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
              type='button'
              onClick={handleAccessFileInputRef}
            >
              Ch???n ???nh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dung l?????ng file t???i ??a 1 MB</div>
              <div>?????nh d???ng: .JPEG, .JPG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default User;
