import { isEmailValid } from "../../helpers/regexMatcher";
import { useStateHandler } from "../../hooks/shared/useStateHandler";
import axiosInstance from "../../helpers/axiosInstance";
import HomeLayout from "../../layouts/HomeLayout";
import { Messages } from "../../constants/Messages";
import { ToasterType } from "../../constants/ToasterType";
import { promiseToaster, showToaster } from "../../utils/ToasterService";

export const ContactUs = () => {
  const initialContactState = {
    name: "",
    email: "",
    message: "",
  };
  const [contactData, handleUserInput, setContactData] =
    useStateHandler(initialContactState);

  async function handleContact(e) {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      showToaster(
        ToasterType.Error,
        Messages.Validation.AllDetailsMandatory
      );
      return;
    }

    if (contactData.name.length < 5) {
      showToaster(ToasterType.Error, Messages.Validation.User.Name);
      return;
    }

    if (!isEmailValid(contactData.email)) {
      showToaster(ToasterType.Error, Messages.Validation.User.Email);
      return;
    }

    const res = promiseToaster(
      axiosInstance.post("/contact", contactData),
      Messages.Loading.User.Contact
    );

    const data = (await res).data;
    if (data?.success) {
      setContactData(initialContactState);
    }
  }

  return (
    <HomeLayout>
      <div className="container-wrapper">
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
