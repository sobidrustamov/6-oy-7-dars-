import React, { useState } from "react";
import {
  useGetTodoQuery,
  usePostTodoMutation,
} from "../redux/service/todo-api";
import { Card } from "./../components/card";
import { useForm } from "react-hook-form";

export const Home = () => {
  const { register, reset, handleSubmit } = useForm();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetTodoQuery(page);
  const [postData] = usePostTodoMutation();
  console.log(page);
  console.log(data);
  const submit = (data) => {
    postData(data)
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
    reset();
  };

  const buttons = Array(data?.pageSize).fill(null);
  if (isLoading) {
    return <h2>Loading...</h2>;
    console.log(isLoading);
  }
  return (
    <div className="container ">
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <input
            className="border p-2 my-1 rounded-lg"
            type="text "
            placeholder="Title"
            {...register("title", { required: true })}
          />
        </div>
        <div>
          <input
            className="border p-2 my-1 rounded-lg"
            type="text "
            placeholder="Description"
            {...register("description", { required: true })}
          />
        </div>
        <button className="bg-blue-400 px-4 py-1 my-1 rounded-sm" type="submit">
          Save
        </button>
      </form>
      {data?.data.map((item) => (
        <Card key={item.id} {...item} />
      ))}
      <div className="flex items-center justify-center gap-1">
        {buttons?.map((_, index) => {
          const number = index + 1;
          return (
            <button
              onClick={() => {
                setPage(number);
              }}
              className={`p-3 bg-red-400 ${
                number == page ? "bg-blue-300" : ""
              }`}
              key={number}
            >
              {number}
            </button>
          );
        })}
      </div>
    </div>
  );
};
