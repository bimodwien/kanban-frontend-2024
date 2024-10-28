"use client";
import React from "react";
import { TTodos } from "@/models/todo.models";
import TodoCard from "./TodoCard";

interface InProgressProps {
  todos: TTodos[];
  openEditModal: (todo: TTodos) => void;
  onDeleteTodo: (id: string) => void;
}

function InProgress({ todos, openEditModal, onDeleteTodo }: InProgressProps) {
  const filteredTodos = todos.filter(
    (todo) => todo && todo.status === "inProgress"
  );

  return (
    <>
      <section className="border border-[#E5E5E5] bg-[#F9F9F9] p-4 shadow-xl mb-5 rounded-md md:w-full">
        <h3 className="font-poppins font-medium mb-5">In Progress</h3>
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
      </section>
    </>
  );
}

export default InProgress;
