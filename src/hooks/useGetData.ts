/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";

export default function useGetData<T>(
  apiFunction: () => Promise<AxiosResponse<T>>,
  dependencies: any[] = [],
  enabled = true
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const requestIdRef = useRef(0);

  const getData = async () => {
    if (!enabled) return;

    const currentRequestId = ++requestIdRef.current;
    setIsLoading(true);
    setError("");

    try {
      const response = await apiFunction();

      if (currentRequestId === requestIdRef.current) {
        setData(response.data);
      }
    } catch (err) {
      if (currentRequestId === requestIdRef.current) {
        if (axios.isAxiosError(err)) {
          setError(
            (err.response?.data as any)?.message || "Something went wrong"
          );
        } else {
          setError("Something went wrong");
        }
      }
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...dependencies]);

  return { data, isLoading, error, refetch: getData };
}