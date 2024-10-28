import { axiosInstance } from "@/lib/axios";
import { TTodos } from "@/models/todo.models";
import React from "react";

export async function fetchTodo(
  setTodos: (value: React.SetStateAction<TTodos[]>) => void
) {
  const axios = axiosInstance();
  try {
    const response = await axios.get("/todos");
    const dataTodo = response.data;
    setTodos(dataTodo.data);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodo(id: string) {
  const axios = axiosInstance();
  try {
    await axios.delete(`/todos/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
