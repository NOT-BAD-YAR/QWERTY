import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from './ThemeContextProvider';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className={`p-4 ${isDark ? 'bg-gray-800' : 'bg-blue-600'} text-white`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">E-Wallet Portal</h1>
        <div className="flex space-x-4 items-center">
          <NavLink to="/" className={({ isActive }) => isActive ? 'underline' : 'hover:underline'}>
            Dashboard
          </NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? 'underline' : 'hover:underline'}>
            Add Transaction
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => isActive ? 'underline' : 'hover:underline'}>
            History
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => isActive ? 'underline' : 'hover:underline'}>
            Reports
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'underline' : 'hover:underline'}>
            About
          </NavLink>
          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;