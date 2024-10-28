"use client";
import React from "react";
import dayjs from "dayjs";
import { TTodos } from "@/models/todo.models";

interface TodoCardProps {
  todo: TTodos;
  onEdit: () => void;
  onDelete: () => void;
}

function TodoCard({ todo, onEdit, onDelete }: TodoCardProps) {
  const priorityClass = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-[#B8EBB0]";
      case "medium":
        return "bg-[#F0CA81]";
      case "high":
        return "bg-[#DE1D3E] text-white";
      default:
        return "";
    }
  };

  return (
    <div
      key={todo.id}
      className="border border-[#666666] p-3 pb-16 rounded-md bg-white relative"
    >
      <div className="flex items-center gap-1">
        <p
          className={`font-poppins font-light text-[#221C1D] px-2 py-1 rounded-full mb-2 inline-block ${priorityClass(
            todo.order ?? "low"
          )}`}
        >
          {todo.order
            ? todo.order.charAt(0).toUpperCase() + todo.order.slice(1)
            : "Low"}
        </p>
        <p className="font-poppins text-base font-semibold text-[#221C1D] py-1 px-2 mb-2">
          {todo.title
            ? todo.title.charAt(0).toUpperCase() + todo.title?.slice(1)
            : ""}
        </p>
      </div>
      <p className="font-poppins text-base font-medium text-[#221C1D] py-1">
        {todo.content
          ? todo.content.charAt(0).toUpperCase() + todo.content.slice(1)
          : ""}
      </p>
      <div className="flex gap-3 py-1">
        <button
          className="font-poppins text-left px-2 py-1 text-white text-opacity-90 bg-[#DE1D6E] rounded-md"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          className="font-poppins text-left px-2 py-1 text-white text-opacity-90 bg-[#4F1DDE] rounded-md"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <p className="font-poppins font-light text-sm pt-2 text-[#666666]">
        {dayjs(todo.createdAt).format("MMM D, YYYY")}
      </p>
      <div className="absolute bottom-0 right-0 mb-2 mr-3 inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
        <span className="font-medium text-gray-600">
          {todo.user?.fullName ? todo.user.fullName.charAt(0) : ""}
        </span>
      </div>
    </div>
  );
}

export default TodoCard;
