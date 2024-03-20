import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";
import { isEmailValid } from "../../helpers/regexMatcher";
import HomeLayout from "../../layouts/HomeLayout";

export const ContactUs = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  }

  async function handleContact(e) {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      toast.error("Please fill all the details");
      return;
    }

    if (contactData.name.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }

    if (!isEmailValid(contactData.email)) {
      toast.error("Enter a valid email");
      return;
    }

    try {
      const res = axiosInstance.post("/contact", contactData);
      toast.promise(res, {
        loading: "Submitting your message",
        success: "Message submitted successfully",
        error: "Failed to submit the message",
      });

      const data = (await res).data;
      if (data.success) {
        setContactData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error?.message);
    }
  }

  return (
    <HomeLayout>
      <div className="container-wrapper flex items-center justify-center">
        <form
          onSubmit={handleContact}
          className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] mt-9 sm:mt-0"
        >
          <h1 className="text-3xl font-semibold">Contact form</h1>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              type="text"
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={contactData.name}
              onChange={handleUserInput}
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Email
            </label>
            <input
              type="text"
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={contactData.email}
              onChange={handleUserInput}
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              id="message"
              name="message"
              placeholder="Enter your message"
              value={contactData.message}
              onChange={handleUserInput}
            />
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-transparent border hover:text-yellow-600 border-yellow-600 rounded-lg py-1 mt-6 transition-all ease-in-out duration-300 font-semibold text-lg"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};
