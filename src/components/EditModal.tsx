"use client";
import React from "react";
import { TTodos } from "@/models/todo.models";
import { Button, Modal } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { fetchTodo } from "@/helpers/fetchTodo";

interface UpdateTodoResponse {
  message: string;
  data: TTodos;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: TTodos;
  updatedTodo: (updatedTodo: TTodos) => void;
  setTodos: (value: React.SetStateAction<TTodos[]>) => void;
}

function EditModal({
  isOpen,
  onClose,
  todo,
  updatedTodo,
  setTodos,
}: EditModalProps) {
  const initialValues = {
    title: todo.title || "",
    content: todo.content || "",
    order: todo.order || "",
    status: todo.status || "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      order: Yup.string().required("Order is required"),
      status: Yup.string().required("Status is required"),
    }),
    onSubmit: async (values) => {
      try {
        const isStatusChanged = values.status !== initialValues.status;
        const isOtherFieldChanged =
          values.title !== initialValues.title ||
          values.content !== initialValues.content ||
          values.order !== initialValues.order;
        let response;
        if (isStatusChanged && !isOtherFieldChanged) {
          response = await axiosInstance().patch<UpdateTodoResponse>(
            `/todos/status/${todo.id}`,
            { status: values.status }
          );
        } else {
          response = await axiosInstance().put<UpdateTodoResponse>(
            `/todos/${todo.id}`,
            values
          );
        }
        const updatedTodoData = response.data.data;
        if (!updatedTodoData) {
          throw new Error("Updated todo is undefined in response");
        }
        updatedTodo(updatedTodoData);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Todo updated successfully",
        });
        formik.resetForm();
        onClose();
        fetchTodo(setTodos);
      } catch (error) {
        if (error instanceof AxiosError) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response?.data.message,
          });
        } else if (error instanceof Error) {
          console.log(error);
        }
      }
    },
  });

  return (
    <>
      <Modal
        show={isOpen}
        onClose={onClose}
        className="mx-auto md:px-6 lg:w-[40%] bg-transparent"
      >
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header className="px-6 py-2">Edit Todo</Modal.Header>
          <Modal.Body>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-base font-poppins font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...formik.getFieldProps("title")}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="order"
                  className="block mb-2 text-base font-poppins font-medium text-gray-900"
                >
                  Order
                </label>
                <select
                  id="order"
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...formik.getFieldProps("order")}
                >
                  <option value="" className="font-poppins">
                    Select an option
                  </option>
                  <option value="low" className="font-poppins">
                    Low
                  </option>
                  <option value="medium" className="font-poppins">
                    Medium
                  </option>
                  <option value="high" className="font-poppins">
                    High
                  </option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="status"
                  className="block mb-2 text-base font-poppins font-medium text-gray-900"
                >
                  Status
                </label>
                <select
                  id="status"
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...formik.getFieldProps("status")}
                >
                  <option value="" className="font-poppins">
                    Select an option
                  </option>
                  <option value="todo" className="font-poppins">
                    Todo
                  </option>
                  <option value="inProgress" className="font-poppins">
                    In Progress
                  </option>
                  <option value="review" className="font-poppins">
                    Review
                  </option>
                  <option value="finished" className="font-poppins">
                    Finished
                  </option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="content"
                  className="block mb-2 text-base font-poppins font-medium text-gray-900"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-400 focus:ring-primary-500 focus:border-primary-500"
                  {...formik.getFieldProps("content")}
                ></textarea>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="bg-[#4F1DDE] font-poppins" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
