import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

interface IUseQueryParams {
  queryParams: { [key: string]: any };
  setQueryParams: (filters: any) => void;
}

const useQueryParams = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParams: { [key: string]: any } = {};
  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  const setQueryParams = (filters: any) => {
    const queryParams = queryString.stringify(filters);
    router.replace(pathname + '?' + queryParams);
  };

  return { queryParams, setQueryParams } as IUseQueryParams;
};

export default useQueryParams;
