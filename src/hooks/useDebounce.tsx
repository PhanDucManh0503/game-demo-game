import { useEffect, useState } from 'react';

function useDebounce(value: any, delay: number = 500) {
  const [result, setResult] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => {
      setResult(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return result;
}

export default useDebounce;
