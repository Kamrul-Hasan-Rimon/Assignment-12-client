import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Homepage from "../Pages/Homepage";
import LoginPage from "../Authentication/Login";
import Register from "../Authentication/Register";
import AllTrainersPage from "../Pages/AllTrainersPage";
import TrainerDetailsPage from "../Pages/TrainerDetailsPage";
import TrainerBookedPage from "../Pages/TrainerBookedPage";
import ClassesPage from "../Pages/ClassesPage";
import ErrorPage from "../Pages/ErrorPage";
import PaymentPage from "../Pages/PaymentPage";
import PrivateRoute from "./PrivateRoute";
import BeATrainerPage from "../Pages/BeATrainerPage";
import ForumPage from "../Pages/ForumPage";
import DashboardLayout from "../Layout/DashboardLayout";
import Balance from "../Layout/Dashboard/AdminDashboard/sideBarMenu/Balance";
import AppliedTrainers from "../Layout/Dashboard/AdminDashboard/sideBarMenu/AppliedTrainers";
import AllSubscribers from "../Layout/Dashboard/AdminDashboard/sideBarMenu/AllSubscribers";
import AddClass from "../Layout/Dashboard/AdminDashboard/sideBarMenu/AddClass";
import AllTrainers from "../Layout/Dashboard/AdminDashboard/sideBarMenu/AllTrainers";
import AppliedTrainerDetails from "../Layout/Dashboard/AdminDashboard/sideBarMenu/AppliedTrainerDetails";
import ManageSlots from "../Layout/Dashboard/TrainerDashboard/TrainerSidebar/ManageSlots";
import AddSlot from "../Layout/Dashboard/TrainerDashboard/TrainerSidebar/AddSlot";
import AddForum from "../Layout/Dashboard/TrainerDashboard/TrainerSidebar/AddForum";
import axiosInstance from "../hooks/axiosInstance";
import AllClasses from "../Layout/Dashboard/AdminDashboard/sideBarMenu/AllClasses";
import ProfilePage from "../Layout/Dashboard/MemberDashboard/ProfilePage";
import ActivityLog from "../Layout/Dashboard/MemberDashboard/ActivityLog";
import BookedTrainer from "../Layout/Dashboard/MemberDashboard/BookedTrainer";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/trainers", element: <AllTrainersPage /> },
      { path: "/classes", element: <ClassesPage /> },
      {
        path: "/trainers/trainerDetails/:id",
        element: <TrainerDetailsPage />,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`https://server-alpha-three.vercel.app/trainers/${params.id}`);
            if (!response.ok) throw new Error("Failed to fetch trainer details");
            return response.json();
          } catch (error) {
            console.error(error);
            return null;
          }
        },
      },
      {
        path: "/trainers/:trainerId/book",
        element: <PrivateRoute><TrainerBookedPage /></PrivateRoute>,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`https://server-alpha-three.vercel.app/trainers/${params.trainerId}`);
            if (!response.ok) throw new Error("Failed to fetch trainer details");
            return response.json();
          } catch (error) {
            console.error(error);
            return null;
          }
        },
      },
      { path: "/payment/:id", element: <PrivateRoute><PaymentPage /></PrivateRoute> },
      { path: "/BeATrainerPage", element: <PrivateRoute><BeATrainerPage /></PrivateRoute> },
      { path: "/forumPage", element: <ForumPage /> },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [

          { path: 'admin/balance', element: <Balance /> },
          { path: 'admin/applied-trainers', element: <AppliedTrainers /> },
          {
            path: 'admin/applied-trainers-details/:id',
            element: <AppliedTrainerDetails />,
            loader: async ({ params }) => {
              try {
                const response = await axiosInstance.get(`/applytrainer/${params.id}`);
                if (!response.data.success) throw new Error('Failed to fetch applied trainer details');
                return response.data.data;
              } catch (error) {
                console.error(error);
                return null;
              }
            },
          },
          { path: 'admin/all-trainers', element: <AllTrainers /> },
          { path: 'admin/subscribers', element: <AllSubscribers /> },
          { path: 'admin/add-class', element: <AddClass /> },
          { path: 'admin/all-classes', element: <AllClasses /> },



          { path: "trainer/manage-slots", element: <ManageSlots /> },
          { path: "trainer/add-slot", element: <AddSlot /> },
          { path: "trainer/add-forum", element: <AddForum /> },

          {
            path: "member/profile",
            element: <ProfilePage />,
          },
          {
            path: "member/activity-log",
            element: <ActivityLog />,
          },
          {
            path: "member/booked-trainer",
            element: <BookedTrainer />,
          },
        ],
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default router;




