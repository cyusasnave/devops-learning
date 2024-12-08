import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { IRequestArgs } from "../@types/requestType";
import APIClient from "../features/apiClient";

/**
 *
 * @param requestArgs: { endpoint: string; config: AxiosRequestConfig | undefined }
 * @param revalidateKey
 * @returns Insure you provide the Generic DataType of the data returned from the API response to get TypeScript intelligence
 */
const useDeleteData = <DataType>(
  requestArgs: IRequestArgs,
  revalidateKey?: QueryKey
) => {
  const apiClient = new APIClient<DataType>(requestArgs.endpoint);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error, isSuccess, data } = useMutation({
    mutationFn: () => apiClient.delete(requestArgs?.config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: revalidateKey });
    },
  });

  return {
    delete: mutateAsync,
    isLoading: isPending,
    error,
    isSuccess,
    data,
  };
};

export default useDeleteData;
