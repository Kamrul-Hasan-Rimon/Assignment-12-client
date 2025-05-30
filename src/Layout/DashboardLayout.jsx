import { Outlet } from "react-router-dom";
import Sidebar from './Dashboard/Sidebar';
const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;