import { AllRoutes } from "../../constants/Routes";
import { CustomButton } from "../../components/shared/CustomButton";
import { CustomInput } from "../../components/shared/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/AuthSlice";
import { Messages } from "../../constants/Messages";
import { showToaster } from "../../utils/ToasterService";
import { ToasterType } from "../../constants/ToasterType";
import { useDispatch } from "react-redux";
import { useStateHandler } from "../../hooks/shared/useStateHandler";
import HomeLayout from "../../layouts/HomeLayout";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialLoginState = {
    email: "",
    password: "",
  };

  const [loginData, handleUserInput, setLoginData] =
    useStateHandler(initialLoginState);

  async function onLogin(e) {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      showToaster(ToasterType.Error, Messages.Validation.AllDetailsMandatory);
      return;
    }

    const res = await dispatch(login(loginData));
    if (res?.payload?.success) {
      setLoginData(initialLoginState);
      navigate(AllRoutes.Home);
    }
  }

  return (
    <HomeLayout>
      <div className="container-wrapper">
        <form
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] sm:mt-0"
        >
          <h1 className="text-center text-2xl font-bold">Welcome back!!</h1>
          <CustomInput
            label="Email"
            name="email"
            placeholder="Enter your email"
            onChange={handleUserInput}
            value={loginData.email}
            type="email"
          />
          <CustomInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            onChange={handleUserInput}
            value={loginData.password}
            type="password"
          />
          <CustomButton title="Login" type="submit" />
          <p className="text-center">
            Don't have an account ?{" "}
            <Link
              to={AllRoutes.SignUp}
              className="link text-accent cursor-pointer whitespace-nowrap"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};
