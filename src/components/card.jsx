import React from "react";
import { Link } from "react-router-dom";
import { useDeleteTodoMutation } from "../redux/service/todo-api";

export const Card = ({ description, title, id }) => {
  const [deleteTodoItem] = useDeleteTodoMutation(id);
  const deleteItem = () => {
    deleteTodoItem(id)
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-between items-center border p-3 my-4">
      <Link className=" " to={`/todos/${id}`}>
        <div>
          <h2 className="text-4xl">{title}</h2>
          <p>{description}</p>
        </div>
      </Link>
      <div>
        <button className="bg-red-500 p-2" onClick={deleteItem}>
          delete
        </button>
      </div>
    </div>
  );
};
