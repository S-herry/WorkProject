import { QueryClient } from "@tanstack/react-query";

export interface Information {
  url: string;
  signal?: AbortSignal;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 失敗時最多重試 1 次
      refetchOnWindowFocus: false, // 切換回視窗時不自動重新請求
    },
  },
});

export async function fetchInformationCard({ url, signal }: Information) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
