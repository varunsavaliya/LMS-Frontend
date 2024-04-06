import { AllRoutes } from "../../constants/Routes";
import { BackButton } from "../../components/shared/BackButton";
import { SubscriptionStatus } from "../../constants/SubscriptionStatus";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserRole } from "../../constants/UserRole";
import { useSelectorOptionsState } from "../../redux/slices/OptionsSlice";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";
import HomeLayout from "../../layouts/HomeLayout";

export const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, role, data } = useSelectorUserState();
  const { users } = useSelectorOptionsState();

  useEffect(() => {
    if (!state?.title) navigate(AllRoutes.Courses);
  }, []);

  return (
    <HomeLayout>
      <div className="container-wrapper flex-col text-white">
        <div className="flex justify-center items-center gap-5">
          <BackButton />
          <h1 className="text-xl md:text-3xl font-bold text-yellow-500">
            {state?.title}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 relative">
          <div className="space-y-5">
            <img
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
              className="w-full h-[45vh] object-cover"
            />
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-between text-xl gap-3">
                <p className="font-semibold ">
                  <span className="text-yellow-500 font-bold">
                    Total Lectures :{" "}
                  </span>
                  {state?.lectures?.length ?? 0}
                </p>

                <p className="font-semibold ">
                  <span className="text-yellow-500 font-bold">
                    Instructor :{" "}
                  </span>
                  {users.find((u) => u._id === state?.createdBy)?.fullName}
                </p>
                {role === UserRole.Admin ||
                data?.subscription?.status === SubscriptionStatus.Active ||
                data?._id === state?.createdBy ? (
                  <button
                    onClick={() =>
                      navigate(AllRoutes.CourseLectures, {
                        state: { ...state },
                      })
                    }
                    className="bg-yellow-600 text-xl rounded-md font-bold py-2 px-5 hover:bg-yellow-500 transition-all ease-in-out duration-300"
                  >
                    Watch Lectures
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      navigate(
                        isLoggedIn ? AllRoutes.Checkout : AllRoutes.Login
                      )
                    }
                    className="bg-yellow-600 text-xl rounded-md font-bold py-2 px-5 hover:bg-yellow-500 transition-all ease-in-out duration-300"
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2 text-xl text-center md:text-left">
            <p className="text-yellow-500"> Course Description: </p>
            <p className="text-base sm:text-lg">{state?.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};
