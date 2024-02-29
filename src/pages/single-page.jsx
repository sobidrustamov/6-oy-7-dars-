import React from "react";
import { useGetSingleTodoQuery } from "../redux/service/todo-api";
import { useParams } from "react-router-dom";
import { Card } from "./../components/card";

export const SinglePage = () => {
  const { id } = useParams();
  const { data, isloading } = useGetSingleTodoQuery(id);
  console.log(data);

  return (
    <div className="container ">
      <Card {...data} />
    </div>
  );
};
