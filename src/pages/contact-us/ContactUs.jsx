import { isEmailValid } from "../../helpers/regexMatcher";
import { useStateHandler } from "../../hooks/shared/useStateHandler";
import axiosInstance from "../../helpers/axiosInstance";
import HomeLayout from "../../layouts/HomeLayout";
import { Messages } from "../../constants/Messages";
import { ToasterType } from "../../constants/ToasterType";
import { promiseToaster, showToaster } from "../../utils/ToasterService";
import { CustomInput } from "../../components/shared/CustomInput";
import { SubmitButton } from "../../components/shared/SubmitButton";

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
      showToaster(ToasterType.Error, Messages.Validation.AllDetailsMandatory);
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
          <h1 className="text-2xl md:text-3xl font-semibold">Contact form</h1>
          <CustomInput
            label="Name"
            name="name"
            onChange={handleUserInput}
            value={contactData.name}
            placeholder="Enter your name"
          />
          <CustomInput
            label="Email"
            type="email"
            name="email"
            onChange={handleUserInput}
            value={contactData.email}
            placeholder="Enter your email"
          />

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name" className="font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent px-2 py-1 border rounded-lg disabled:bg-gray-800"
              id="message"
              name="message"
              placeholder="Enter your message"
              value={contactData.message}
              onChange={handleUserInput}
            />
          </div>
          <SubmitButton title="Submit" />
        </form>
      </div>
    </HomeLayout>
  );
};
