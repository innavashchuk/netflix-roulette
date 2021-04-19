import { useState, useEffect, useCallback } from 'react';

export interface RequestProps<T> {
  url: string;
  init?: RequestInit;
  processData?: (data: any) => T;
}

export default function useFetch<T>({ url, init, processData }: RequestProps<T>): [string, T] {
  const [data, setData] = useState<T>();
  const [stringifiedInit] = [JSON.stringify(init)];
  const [status, setStatus] = useState('idle');

  let callback: (data: any) => T;
  if (processData) {
    callback = useCallback(processData, []);
  }

  useEffect(() => {
    const fetchApi = async() => {
      if (!url) {
        setStatus('idle');
        setData(null);
        return;
      }
      try {
        setStatus('fetching');
        const response = await fetch(url, init);
  
        if (response.status === 200) {
          const rawData: {data: T} | T = await response.json();
          setData((rawData as {data: T}).data ? (rawData as {data: T}).data : rawData as T);
          if (callback) {
            callback(rawData);
          }
          setStatus('success');
        } else {
          console.error(`Error ${response.status} ${response.statusText}`);
          setStatus('error');
        }
      } catch (error) {
        console.error(`Error ${error}`);
        setStatus('error');
      }
    };
    fetchApi();
  }, [url, stringifiedInit, callback]);

  return [status, data];
};
