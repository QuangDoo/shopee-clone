import { omit } from 'lodash';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import { path } from 'src/constants';
import useQueryConfig from './useQueryConfig';

const useSearchProducts = () => {
  const { register, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: ''
    }
  });

  const queryConfig = useQueryConfig();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    if (!data.name) {
      return navigate({
        pathname: path.home,
        search: createSearchParams(omit(queryConfig, ['name'])).toString()
      });
    }

    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.name + '' }, ['order', 'sort_by'])
      : { ...queryConfig, name: data.name + '' };

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    });
  });
  return { onSubmit, register };
};

export default useSearchProducts;
