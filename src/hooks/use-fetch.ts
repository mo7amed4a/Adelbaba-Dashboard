// hooks/useFetch.ts
import axiosClient from "@/lib/axiosClient";
import { useState, useEffect } from "react";

export const useFetch = <T>(url: string, refresh: boolean = false) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const api = await axiosClient();
      const res = await api.get(url);
      setData(res?.data?.data || res?.data); // لو الداتا جوا data.data أو مباشرة
    } catch (err) {
      setError("فشل في جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, refresh]);

  return { data, loading, error, refetch: fetchData };
};