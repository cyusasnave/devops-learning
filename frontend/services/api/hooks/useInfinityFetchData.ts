import { useInfiniteQuery } from "@tanstack/react-query";
import { IRequestArgs } from "../@types/requestType";
import APIClient from "../features/apiClient";

/**
 *
 * @param requestArgs: { endpoint: string; config: AxiosRequestConfig | undefined }
 * @param queryKey
 * @param staleTime
 * @returns Remember to Modify this logic in the getNextPageParam in the hook based on your API response structure and insure there is hasNextPage or other property that show when here is next page property
 * and provide the Generic DataType of the API response
 */
const useInfinityFetchData = <DataType>(
  requestArgs: IRequestArgs,
  queryKey: Array<string>,
  staleTime?: number
) => {
  const apiClient = new APIClient<DataType>(requestArgs.endpoint);

  const {
    data,
    isLoading,
    error,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      apiClient.fetch({
        ...requestArgs.config,
        params: {
          ...requestArgs.config?.params,
          page: pageParam,
        },
      }),
    staleTime,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Modify this logic based on your API response structure and insure there is hasNextPage or other property that show when here is next page property
      return lastPage /* modify this to (lastPage.hasNextPage) */
        ? allPages.length + 1
        : undefined;
    },
  });

  return {
    isLoading,
    isSuccess,
    data, // Contains all pages of data
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useInfinityFetchData;
