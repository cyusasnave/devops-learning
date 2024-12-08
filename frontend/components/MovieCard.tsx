"use client";

import { FC, useEffect, useState } from "react";
import { IMovie } from "./Movies";
import { useDeleteData } from "@/services/api";
import toast from "react-hot-toast";

interface Props {
  movie: IMovie;
}

const MovieCard: FC<Props> = ({ movie }) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const {
    isLoading,
    isSuccess,
    error,
    delete: remove,
    data,
  } = useDeleteData<IMovie>({ endpoint: `/movies/${movie.id}` }, ["movies"]);

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(`Movie (${data.name}) deleted successfully!`);
      setDeleteId(null);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="bg-gray-300 rounded-md text-black p-3 flex items-center justify-between my-2">
      <div className="pl-4">{movie.name}</div>
      <button
        onClick={async () => {
          setDeleteId(movie.id);
          await remove();
        }}
        disabled={isLoading}
        className="text-white bg-red-800 hover:bg-red-600 cursor-pointer p-2 rounded-md text-center"
      >
        {isLoading && deleteId === movie.id ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default MovieCard;
