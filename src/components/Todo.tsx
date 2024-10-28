"use client";
import React, { useState } from "react";
import AddModal from "./AddModal";
import TodoCard from "./TodoCard";
import { TTodos } from "@/models/todo.models";

interface TodoProps {
  todos: TTodos[];
  setTodos: React.Dispatch<React.SetStateAction<TTodos[]>>;
  openEditModal: (todo: TTodos) => void;
  onDeleteTodo: (id: string) => void;
}

function Todo({ todos, setTodos, openEditModal, onDeleteTodo }: TodoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTodo = (newTodo: TTodos) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const filteredTodos = todos.filter((todo) => todo && todo.status === "todo");

  return (
    <>
      <section className="border border-[#E5E5E5] bg-[#F9F9F9] p-4 shadow-xl mb-5 rounded-md md:w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-poppins font-medium mb-5">Todo</h3>
          <button
            onClick={openModal}
            className="font-poppins font-medium mb-5 underline underline-offset-4"
          >
            Add Todo
          </button>
        </div>
        <div className="flex flex-col gap-5">
          {filteredTodos.map((todo) => {
            return (
              <TodoCard
                key={todo.id}
                todo={todo}
                onEdit={() => openEditModal(todo)}
                onDelete={() => onDeleteTodo(todo.id)}
              />
            );
          })}
        </div>
        <AddModal
          isOpen={isModalOpen}
          onClose={closeModal}
          addTodo={addTodo}
          setTodos={setTodos}
        />
      </section>
    </>
  );
}

export default Todo;
