import { useQuery } from "@tanstack/react-query";
import { IRequestArgs } from "../@types/requestType";
import APIClient from "../features/apiClient";
/**
 *
 * @param requestArgs: { endpoint: string; config: AxiosRequestConfig | undefined }
 * @param queryKey
 * @param staleTime
 * @returns Insure you provide the Generic DataType of data returned from the API response to get TypeScript intelligence
 */
const useFetchData = <DataType>(
  requestArgs: IRequestArgs,
  queryKey: Array<string>,
  staleTime?: number
) => {
  const apiClient = new APIClient<DataType>(requestArgs.endpoint);

  const { data, isLoading, error, refetch, isSuccess } = useQuery({
    queryKey,
    queryFn: () => apiClient.fetch(requestArgs?.config),
    staleTime,
  });

  return {
    isLoading,
    isSuccess,
    data,
    error,
    refetch,
  };
};

export default useFetchData;
