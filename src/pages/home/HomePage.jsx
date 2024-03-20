import { Link } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import HomePageImage from "../../assets/images/homePageMainImage.png";
import { AllRoutes } from "../../constants/Routes";

function HomePage() {
  return (
    <>
      <HomeLayout>
        <div className="container-wrapper text-white flex items-center justify-center gap-10">
          <div className="w-full md:w-1/2  space-y-6">
            <h1 className="sm:text-5xl text-3xl font-semibold text-center sm:text-left">
              Find out best
              <span className="text-yellow-500 font-bold"> Online Courses</span>
            </h1>
            <p className="text-xl text-gray-200 text-center sm:text-left">
              We have large library of courses taught by highly skilled and
              qualified faculties at a very affordable cost
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-5">
              <Link to={AllRoutes.Courses}>
                <button className="bg-yellow-500 px-5 py-3 h-full rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 whitespace-nowrap">
                  Explore courses
                </button>
              </Link>

              <Link className="m-0" to={AllRoutes.Contact}>
                <button className="min-w-10 border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          <div className="w-1/2  items-center justify-end hidden lg:flex">
            <img alt="homepage image" src={HomePageImage} />
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default HomePage;
