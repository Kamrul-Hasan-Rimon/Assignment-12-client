import { useEffect, useState } from "react";
import axios from "../../../../hooks/axiosInstance";
import Swal from "sweetalert2";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        Swal.fire("Error", "Please log in to view balance", "error");
        return;
      }
      try {
        const { data } = await axios.get("/admin/balance");
        setBalance(data.totalBalance / 100);
        setTransactions(data.recentTransactions);
        setChartData([
          { name: "Subscribers", value: data.totalSubscribers || 0 },
          { name: "Paid Members", value: data.totalPaidMembers || 0 },
        ]);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch balance");
        Swal.fire(
          "Error",
          err.response?.data?.message || "Failed to fetch balance",
          "error"
        );
      }
    };
    fetchBalance();
  }, []);

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold">Balance Overview</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Balance Overview</h1>
      <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">
          Total Balance: ${balance.toFixed(2)}
        </h2>
        <h3 className="mt-4 font-medium">Recent Transactions</h3>
        <ul className="mt-2">
          {transactions.map((txn, index) => (
            <li key={index} className="border-b py-2">
              {txn.memberName} paid ${(txn.amount / 100).toFixed(2)} on{" "}
              {new Date(txn.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
      {chartData.length > 0 && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">
            Subscribers vs. Paid Members
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Balance;
