import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const HabitList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await axios.get('http://localhost:3001');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch habits:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteUser/${id}`);
      fetchHabits(); // Refresh list
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const markAsDone = async (id) => {
    try {
      await axios.put(`http://localhost:3001/habit/done/${id}`);
      fetchHabits(); 
    } catch (err) {
      console.error('Mark as done failed:', err);
    }
  };
  

  const pendingHabits = users.filter(user => !user.done);
  const completedHabits = users.filter(user => user.done);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Habit List</h2>
        <Link to="/habit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Add New
        </Link>
      </div>

      {/* Pending Section */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Pending Habits</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {pendingHabits.map(user => (
          <div key={user._id} className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Habit: {user.habit}</h3>
              <p className="text-sm text-gray-500 mt-1">Date: {new Date(user.date).toLocaleString()}</p>
            </div>
            <div className="mt-4 flex justify-end gap-x-2 items-center">
              <button
                onClick={() => markAsDone(user._id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
              >
                Done
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Section */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Completed Habits</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {completedHabits.map(user => (
          <div key={user._id} className="bg-green-50 p-4 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Habit: {user.habit}</h3>
              <p className="text-sm text-gray-500 mt-1">Date: {new Date(user.date).toLocaleString()}</p>
            </div>
            <div className="mt-4 flex justify-end items-center text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="ml-2 text-sm font-medium">Completed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitList;
