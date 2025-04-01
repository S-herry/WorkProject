import { QueryClient } from "@tanstack/react-query";

export interface Information {
  url: string;
  signal?: AbortSignal;
}

export const queryClient = new QueryClient();

export async function fetchInformationCard({ url, signal }: Information) {
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null; // 確保返回一個有效值
  }
}
