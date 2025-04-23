import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HabitForm = () => {
  const [habit, setHabit] = useState();
  const [date, setDate] = useState();
  const navigate = useNavigate()

  const Submit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/habit', {habit, date})
    .then(result =>{ console.log(result)
        navigate('/')
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Habit</h2>
      <form onSubmit={Submit} className="space-y-4">
        <input
          type="text"
          placeholder="Habit"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setHabit(e.target.value)}
        />

        <input
          type="datetime-local"
          placeholder="Date and Time"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default HabitForm;
