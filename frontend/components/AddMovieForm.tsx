"use client";

import { useAddData } from "@/services/api";
import { useEffect, useRef } from "react";
import { IMovie } from "./Movies";
import toast from "react-hot-toast";

type RequestType = {
  name: string;
};

const AddMovieForm = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { create, data, error, isLoading, isSuccess } = useAddData<
    RequestType,
    IMovie
  >({ endpoint: "/movies" }, ["movies"]);

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(`Movie (${data.name}) added successfully!`);
      if (inputRef?.current) {
        inputRef.current.value = "";
      }
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <form
      className="w-full max-w-3xl mb-5"
      onSubmit={async (e) => {
        e.preventDefault();
        if (inputRef?.current?.value) {
          const name = inputRef?.current?.value;
          await create({ name });
        }
      }}
    >
      <label htmlFor="name">Enter movie name:</label>
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          name="name"
          id="name"
          placeholder="Movie name"
          className="w-full p-3 rounded-md text-black"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="p-3 bg-blue-700 w-40 rounded-md disabled:bg-blue-700/50"
        >
          {isLoading ? "adding..." : "Add"}
        </button>
      </div>
    </form>
  );
};

export default AddMovieForm;
