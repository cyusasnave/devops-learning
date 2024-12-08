import AddMovieForm from "@/components/AddMovieForm";
import Movies from "@/components/Movies";
import { fetcher } from "@/services/fetcher";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["movies"],
    queryFn: () => fetcher("/movies"),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen">
        <AddMovieForm />
        <Movies />
      </div>
    </HydrationBoundary>
  );
}
