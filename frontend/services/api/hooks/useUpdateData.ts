import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { IRequestArgs } from "../@types/requestType";
import APIClient from "../features/apiClient";

/**
 *
 * @param requestArgs: { endpoint: string; config: AxiosRequestConfig | undefined }
 * @param revalidateKey
 * @returns Insure you provide Generic RequestType of the Data you want to update and the Generic DataType of the data returned from the API response to get TypeScript intelligence
 */
const useUpdateData = <RequestType, DataType>(
  requestArgs: IRequestArgs,
  revalidateKey?: QueryKey
) => {
  const apiClient = new APIClient<DataType, RequestType>(requestArgs.endpoint);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error, isSuccess, data } = useMutation({
    mutationFn: (data: RequestType) =>
      apiClient.put(data, requestArgs?.config || {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: revalidateKey });
    },
  });

  return {
    update: mutateAsync,
    isLoading: isPending,
    error,
    isSuccess,
    data,
  };
};

export default useUpdateData;