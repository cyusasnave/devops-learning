"use client";

import { useFetchData } from "@/services/api";
import MovieCard from "./MovieCard";

export type IMovie = {
  id: string;
  name: string;
};

const Movies = () => {
  const { data, isLoading, isSuccess, error } = useFetchData<Array<IMovie>>(
    { endpoint: "/movies" },
    ["movies"]
  );
  if (isLoading) return <p>loading...</p>;
  if (error) return <p className="text-red-600">{error.message}</p>;

  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-2xl uppercase underline font-bold">Movies</h2>
      {isSuccess &&
        data?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};

export default Movies;
