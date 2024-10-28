"use client";
import React, { useEffect, useState } from "react";
import Finished from "@/components/Finished";
import InProgress from "@/components/InProgress";
import Review from "@/components/Review";
import Todo from "@/components/Todo";
import EditModal from "@/components/EditModal";
import Swal from "sweetalert2";
import { TTodos } from "@/models/todo.models";
import { fetchTodo, deleteTodo } from "@/helpers/fetchTodo";

export default function Home() {
  const [todos, setTodos] = useState<TTodos[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<TTodos | null>(null);

  const openEditModal = (todo: TTodos) => {
    setTodoToEdit(todo);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTodoToEdit(null);
  };

  const updatedTodo = (updatedTodo: TTodos) => {
    if (!updatedTodo) {
      console.log("updatedTodo is undefined");
      return;
    }
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = async (id: string) => {
    Swal.fire({
      title: "Are you sure you want to delete this Todo?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#EF5A6F",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTodo(id);
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Todo has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the todo.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#EF5A6F",
          });
          console.error(error);
        }
      }
    });
  };

  useEffect(() => {
    fetchTodo(setTodos);
  }, []);

  return (
    <>
      <section className="pt-[100px] px-10 min-h-lvh">
        <div className="md:flex md:flex-col md:justify-center md:items-center lg:grid lg:grid-cols-4 lg:gap-5 lg:items-start">
          <Todo
            todos={todos}
            setTodos={setTodos}
            openEditModal={openEditModal}
            onDeleteTodo={handleDeleteTodo}
          />
          <InProgress
            todos={todos}
            openEditModal={openEditModal}
            onDeleteTodo={handleDeleteTodo}
          />
          <Review
            todos={todos}
            openEditModal={openEditModal}
            onDeleteTodo={handleDeleteTodo}
          />
          <Finished
            todos={todos}
            openEditModal={openEditModal}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
        {todoToEdit && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            todo={todoToEdit}
            updatedTodo={updatedTodo}
            setTodos={setTodos}
          />
        )}
      </section>
    </>
  );
}
