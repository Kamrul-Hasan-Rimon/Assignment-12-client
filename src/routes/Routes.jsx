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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/trainers",
        element: <AllTrainersPage />,
      },
      {
        path: "/classes",
        element: <ClassesPage />,
      },
      {
        path: "/trainers/trainerDetails/:id",
        element: <TrainerDetailsPage />,
        loader: ({ params }) => fetch(`http://localhost:4000/trainers/${params.id}`),
      },
      {
        path: "/trainers/:trainerId/book",
        element: <PrivateRoute><TrainerBookedPage /></PrivateRoute>,
        loader: async ({ params }) => {
          const response = await fetch(`http://localhost:4000/trainers/${params.trainerId}`);
          return response.json();
        },
      },
      {
        path: '/payment',
        element:<PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
