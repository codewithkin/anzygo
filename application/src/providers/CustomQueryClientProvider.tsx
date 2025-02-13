"use client";
import { create } from "zustand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface QueryStore {
  queryClient: QueryClient;
  setQueryClient: (queryClient: QueryClient) => void;
}

export const useQueryStore = create<QueryStore>((set) => ({
  queryClient: new QueryClient(),
  setQueryClient: (queryClient) => set({ queryClient }),
}));

export const QueryClientProviderWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { queryClient } = useQueryStore();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default useQueryStore;
