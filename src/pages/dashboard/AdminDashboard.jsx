import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  useSelectorRazorpayState,
  getPaymentRecord,
} from "../../redux/slices/RazorpaySlice";
import {
  getCourses,
  useSelectorCourseState,
} from "../../redux/slices/CourseSlice";
import { FcSalesPerformance } from "react-icons/fc";
import {
  getStatsData,
  useSelectorStatsState,
} from "../../redux/slices/StatsSlice";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import HomeLayout from "../../layouts/HomeLayout";
import { CourseTable } from "../../components/course/CourseTable";
import { StatsItem } from "../../components/dashboard/StatsItem";
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

export const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { allUsersCount, subscribedCount } = useSelectorStatsState();
  const { allPayments, finalMonths, monthlySalesRecord } =
    useSelectorRazorpayState();
  const { allCourses } = useSelectorCourseState();

  const usersData = {
    labels: ["Registered Users", "Enrolled Users"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: finalMonths,
    fontColor: "white",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255,99,132)"],
        borderWidth: 2,
        borderColor: ["white"],
      },
    ],
  };

  useEffect(() => {
    (async () => {
      await dispatch(getCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);
  return (
    <HomeLayout>
      <div className="container-wrapper flex-col flex-wrap gap-3 md:gap-10 text-white">
        <h1 className="text-center text-2xl md:text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-5 m-auto md:mx-10">
          <div className="flex flex-col items-center gap-10 sm:p-5 p-2 shadow-lg rounded-md">
            <div className="w-80 h-80 md:block hidden">
              <Pie data={usersData} />
            </div>

            <div className="grid md:grid-cols-2 w-full gap-5">
              <StatsItem number={allUsersCount} title="Users">
                <FaUsers className="text-yellow-500 text-3xl lg:text-5xl" />
              </StatsItem>
              <StatsItem number={subscribedCount} title="Subscribes">
                <FaUsers className="text-green-500 text-3xl lg:text-5xl" />
              </StatsItem>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 sm:p-5 p-2 shadow-lg rounded-md">
            <div className="h-80 w-full md:block hidden">
              <Bar className="h-80 w-full" data={salesData} />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <StatsItem number={allPayments?.length} title="Subscriptions">
                <FcSalesPerformance className="text-yellow-500 text-3xl lg:text-5xl" />
              </StatsItem>
              <StatsItem number={allPayments?.length * 499} title="Revenue">
                <GiMoneyStack className="text-green-500 text-3xl lg:text-5xl" />
              </StatsItem>
            </div>
          </div>
        </div>
        <CourseTable courses={allCourses} />
      </div>
    </HomeLayout>
  );
};
