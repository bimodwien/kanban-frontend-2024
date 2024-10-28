"use client";
import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegisterComponent = () => {
  const router = useRouter();

  const initialValues = {
    username: "",
    fullName: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().required().email("Invalid email address"),
      password: Yup.string().required(),
      fullName: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance().post("/users/register", values);
        Swal.fire({
          title: "Registration Successful!",
          text: "You have successfully created an account.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          router.push("/login");
        });
      } catch (error: unknown) {
        let errorMessage =
          "There was an issue with the registration. Please try again.";
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#EF5A6F",
        });
        console.log(error);
      }
    },
  });

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            href={"/"}
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 font-poppins"
          >
            Kanban 2024
          </Link>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 font-poppins">
                Create an account
              </h1>
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 font-poppins"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-[#FAF9F6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium text-gray-900 font-poppins"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="bg-[#FAF9F6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    {...formik.getFieldProps("fullName")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 font-poppins"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-[#FAF9F6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    {...formik.getFieldProps("username")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 font-poppins"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-[#FAF9F6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    {...formik.getFieldProps("password")}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center font-poppins"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 font-poppins">
                  Already have an account?{" "}
                  <Link
                    href={"/login"}
                    className="font-medium text-blue-600 hover:underline font-poppins"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterComponent;
