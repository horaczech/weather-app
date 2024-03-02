import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { LocationDetailRes, LocationSearchRes } from "@/types/api";

const api = axios.create({
  baseURL: "https://www.yr.no/api/v0",
});

const apiShort = axios.create({
  baseURL: "https://www.yr.no",
});

export const useFetchSearchLocation = (
  variables: {
    text: string;
  },
  config?:
    | Omit<UseQueryOptions<any, any, any, any>, "queryFn" | "queryKey">
    | undefined,
) => {
  const text = variables?.text;
  return useQuery<LocationSearchRes, AxiosError>({
    queryKey: ["searchLocation", text],
    queryFn: async () => {
      const res = await api.get("/locations/suggest", {
        params: {
          language: "en",
          q: text,
        },
      });
      return res.data;
    },
    refetchOnMount: false,
    ...config,
  });
};

export const useFetchLocationDetail = (
  id: string | undefined,
  config?:
    | Omit<UseQueryOptions<any, any, any, any>, "queryFn" | "queryKey">
    | undefined,
) => {
  return useQuery<LocationDetailRes, AxiosError>({
    queryKey: ["locationDetail", id],
    queryFn: async () => {
      const res = await api.get(`/locations/${id}`, {
        params: {
          language: "en",
        },
      });
      return res.data;
    },
    refetchOnMount: false,
    ...config,
  });
};

export const useFetchDynamicUrl = <T>(
  url: string | undefined = "",
  config?:
    | Omit<UseQueryOptions<any, any, any, any>, "queryFn" | "queryKey">
    | undefined,
) => {
  return useQuery<T, AxiosError>({
    queryKey: ["dynamicUrl", url],
    queryFn: async () => {
      const res = await apiShort.get(url, {
        params: {
          language: "en",
        },
      });
      return res.data;
    },
    refetchOnMount: false,
    ...config,
  });
};
